import React from 'react';

import './InputBar.css';

const InputBar = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="textarea"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === 'Enter' ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default InputBar;
