const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("New client connected ✅");

  ws.send("Welcome to BidPal WebSocket test!");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // Echo back
    ws.send(`Server says: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected ❌");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
