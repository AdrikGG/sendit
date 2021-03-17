import React from 'react';

import './Message.css';

const Message = ({ message: { text, username } }) => {

  return (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10 ">{username}</p>
    </div>
  );
}

export default Message;