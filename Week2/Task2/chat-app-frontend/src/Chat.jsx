import React, { useEffect, useRef, useState } from 'react';

const Chat = ({ username, roomName, receiver }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('Message received:', data);
      setMessages((prev) => [...prev, data]);
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    socket.onclose = () => {
      console.log('🔌 WebSocket closed');
    };

    return () => socket.close();
  }, [roomName]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;

    const messageData = {
      sender: username,
      receiver: receiver,
      message: input,
    };

    console.log('Sending message:', messageData);
    socketRef.current.send(JSON.stringify(messageData));
    setInput('');
  };

  return (
    <div>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid gray', marginBottom: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
