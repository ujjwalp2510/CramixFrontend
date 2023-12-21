import React from "react";
import "../styles/Discussions.css";

function MessageOthers({ props }) {
  return (
    <div className={"other-message-container"}>
      <div className={"other-text-content"}>
        <p className={"con-title"} style={{ color: "white" }}>
          {props.sendername}
        </p>
        <p className={"con-lastMessage"} style={{ color: "white" }}>
          {props.content}
        </p>
      </div>
    </div>
  );
}

export default MessageOthers;
