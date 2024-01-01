import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css";
import Chat from "./Chat";
const socket = io.connect("https://chat-server-amber.vercel.app/");

const App = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      setShowChat(true);
      socket.emit("join-room", room);
    }
  };
  return (
    <div className="main-container">
      {showChat === false ? (
        <>
          <h3>Join Chat</h3>
          <div className="join-chat">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room ID"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        </>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default App;
