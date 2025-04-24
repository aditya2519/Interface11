import React, { useState } from 'react';
import Chat from './Chat';

function App() {
  const [username] = useState('alice');
  const [receiver] = useState('bob');
  const [roomName] = useState('alice_bob');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Vite Real-Time Chat</h1>
      <Chat username={username} roomName={roomName} receiver={receiver} />
    </div>
  );
}

export default App;
