import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat">
      <div className="chat-header">
       <p className="username">{username.split([])[0]}</p> <h1>Group Chat</h1>
      </div>
      <div className="chat-body">
        {messageList.map((data) => {
          return (
            <div
              className={`message ${
                username === data.author ? "you" : "other"
              }`}
            >
              <div className="message-content">
                <p>{data.message}</p>
              </div>
              <div className="message-footer">
                <div className="message-author">
                  <p>{data.author}</p>
                </div>
                <div className="message-time">
                  <p>{data.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Enter Message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
