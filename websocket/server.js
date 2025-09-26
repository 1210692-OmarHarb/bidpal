// backend/server.js
// Node WebSocket server for BidPal
// npm init -y && npm install ws

const WebSocket = require("ws");
const url = require("url");

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

/*
Data structures (in-memory):
- clients: Set of ws connections (ws._id, ws.userId)
- userSockets: Map userId -> Set(ws)
- auctionWatchers: Map auctionId -> Set(ws)
- groupRooms: Map groupId -> Set(ws)
*/

const userSockets = new Map(); // userId -> Set(ws)
const auctionWatchers = new Map(); // auctionId -> Set(ws)
const groupRooms = new Map(); // groupId -> Set(ws)

let NEXT_CLIENT_ID = 1;

function safeSend(ws, obj) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(obj));
  }
}

function broadcastSet(setOfWs, obj) {
  if (!setOfWs) return;
  const msg = JSON.stringify(obj);
  for (const c of setOfWs) {
    if (c.readyState === WebSocket.OPEN) c.send(msg);
  }
}

wss.on("connection", (ws, req) => {
  ws._id = NEXT_CLIENT_ID++;
  const params = url.parse(req.url, true).query;
  // optional userId provided by client: ?userId=123
  const userId = params.userId || null;
  ws.userId = userId;

  // bind to userSockets map
  if (userId) {
    if (!userSockets.has(userId)) userSockets.set(userId, new Set());
    userSockets.get(userId).add(ws);
  }

  // store room membership sets on ws for cleanup
  ws.auctions = new Set();
  ws.groups = new Set();

  console.log(`WS connected: client=${ws._id} user=${userId || "anon"}`);

  // welcome
  safeSend(ws, { type: "welcome", payload: `connected client ${ws._id}` });

  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch (e) {
      console.warn("Invalid JSON:", raw);
      return;
    }

    // expected message shape: { type: "join_auction"|"leave_auction"|"bid"|"join_group"|"group_message"|"notify", payload: {...} }
    const { type, payload } = msg;

    switch (type) {
      // --- auction room management ---
      case "join_auction": {
        const { auctionId } = payload;
        if (!auctionId) break;
        if (!auctionWatchers.has(auctionId))
          auctionWatchers.set(auctionId, new Set());
        auctionWatchers.get(auctionId).add(ws);
        ws.auctions.add(auctionId);
        safeSend(ws, { type: "joined_auction", payload: { auctionId } });
        break;
      }
      case "leave_auction": {
        const { auctionId } = payload;
        if (!auctionId) break;
        const s = auctionWatchers.get(auctionId);
        if (s) s.delete(ws);
        ws.auctions.delete(auctionId);
        safeSend(ws, { type: "left_auction", payload: { auctionId } });
        break;
      }

      // --- bidding action ---
      case "bid": {
        // payload: { auctionId, bidderId, amount }
        const { auctionId, bidderId, amount } = payload || {};
        if (!auctionId || typeof amount !== "number") {
          safeSend(ws, { type: "error", payload: "invalid bid payload" });
          break;
        }

        // Broadcast bid update to everyone watching this auction
        const watchers = auctionWatchers.get(auctionId);
        const bidMsg = {
          type: "bid_update",
          payload: {
            auctionId,
            bidderId: bidderId || ws.userId || null,
            amount,
            at: Date.now(),
          },
        };

        broadcastSet(watchers, bidMsg);

        // Optionally: Also send notification to the seller or specific users (if your flow supports)
        break;
      }

      // --- group chat ---
      case "join_group": {
        const { groupId } = payload;
        if (!groupId) break;
        if (!groupRooms.has(groupId)) groupRooms.set(groupId, new Set());
        groupRooms.get(groupId).add(ws);
        ws.groups.add(groupId);
        safeSend(ws, { type: "joined_group", payload: { groupId } });
        break;
      }
      case "leave_group": {
        const { groupId } = payload;
        if (!groupId) break;
        const s = groupRooms.get(groupId);
        if (s) s.delete(ws);
        ws.groups.delete(groupId);
        safeSend(ws, { type: "left_group", payload: { groupId } });
        break;
      }
      case "group_message": {
        const { groupId, authorId, text } = payload || {};
        if (!groupId || !text) break;
        const room = groupRooms.get(groupId);
        const out = {
          type: "group_message",
          payload: {
            groupId,
            authorId: authorId || ws.userId || null,
            text,
            at: Date.now(),
          },
        };
        broadcastSet(room, out);
        break;
      }

      // --- direct notification to a userId ---
      case "notify": {
        // payload: { toUserId, title, body }
        const { toUserId, title, body } = payload || {};
        const sockets = userSockets.get(String(toUserId));
        if (sockets) {
          const note = {
            type: "notification",
            payload: { title, body, at: Date.now() },
          };
          broadcastSet(sockets, note);
        }
        break;
      }

      default:
        safeSend(ws, { type: "error", payload: "unknown message type" });
    }
  });

  ws.on("close", () => {
    console.log(`WS closed: client=${ws._id} user=${ws.userId || "anon"}`);
    // cleanup userSockets
    if (ws.userId && userSockets.has(ws.userId)) {
      userSockets.get(ws.userId).delete(ws);
      if (userSockets.get(ws.userId).size === 0) userSockets.delete(ws.userId);
    }
    // remove from auction watchers
    for (const a of ws.auctions) {
      const s = auctionWatchers.get(a);
      if (s) {
        s.delete(ws);
        if (s.size === 0) auctionWatchers.delete(a);
      }
    }
    // remove from groups
    for (const g of ws.groups) {
      const s = groupRooms.get(g);
      if (s) {
        s.delete(ws);
        if (s.size === 0) groupRooms.delete(g);
      }
    }
  });

  ws.on("error", (err) => {
    console.error("WS error", err);
  });
});

console.log(`WebSocket server listening on ws://localhost:${PORT}`);
