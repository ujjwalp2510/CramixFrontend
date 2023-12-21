import React from "react";

function MessageSelf({ props }) {
  return (
    <div className="self-message-container">
      <div className="messageBox">
        <p className='con-lastMessage' style={{ color: "white" }}>{props.content}</p>
      </div>
    </div>
  );
}

export default MessageSelf;
