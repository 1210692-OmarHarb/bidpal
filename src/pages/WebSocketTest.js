import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function WebSocketTest() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      setMessages((prev) => [...prev, "✅ Connected to WebSocket server"]);
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, "📩 " + event.data]);
    };

    socket.onclose = () => {
      setMessages((prev) => [...prev, "❌ Disconnected"]);
    };

    setWs(socket);

    // cleanup
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && input.trim()) {
      ws.send(input);
      setMessages((prev) => [...prev, "➡️ Sent: " + input]);
      setInput("");
    }
  };

  return (
    <>
      <Navigation />
      <main>
        <section className="section personal-view">
          <div className="hero personal-menu">
            <div className="menu-profile-info">
              <h2>WebSocket Test</h2>
              <div className="chat-box">
                {messages.map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
              <input
                className="input11"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="btn1" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default WebSocketTest;
