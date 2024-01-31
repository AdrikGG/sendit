import React from 'react';

import Message from '../Message/Message';

import './Messages.css';

const Messages = ({ messages, containerRef }) => {
  return (
    <div className="messages" ref={containerRef}>
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </div>
  );
};

export default Messages;
