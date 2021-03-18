import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

import './Messages.css';

const Messages = ({ messages }) => {
  console.log("In messages");
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message} /></div>)}
    </ScrollToBottom>
  )
};

export default Messages;

// export default function Messages() {
//   console.log(messages);
//   console.log("In messages");
//   if(messages.length > 0) {
//     console.log("condition 1");
//     return (
//       <ScrollToBottom className="messages">
//         {messages.map((message, i) => <div key={i}><Message message={message} /></div>)}
//       </ScrollToBottom>
//     )
//   } else {
//     console.log("condition 2");
//     return (
//       <ScrollToBottom className="messages"></ScrollToBottom>
//     )
//   }
// };