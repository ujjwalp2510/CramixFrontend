import React, {useEffect, useState } from "react";
import MessageSelf from './MessageSelf';
import MessageOthers from './MessageOthers';
import axios from 'axios';
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import '../styles/Discussions.css';
import io from "socket.io-client";
import cross from '../static/cross.png';
const ENDPOINT = "https://cramixbackend.onrender.com";

var data,socket;
function Discussions(props){
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [messageContent, setMessageContent] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [allMessagesCopy, setAllMessagesCopy] = useState([]);
    const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
    const chat_id=props.chatId;

    const sendMessage = () => {
      const messageData = {
        sendername: userData.name,
        senderemail: userData.email,
        content: messageContent,
        chatId: chat_id,
      };
        axios
          .post(
            "https://cramixbackend.onrender.com/api/discussions", messageData
          )
          .then(({ response }) => {
            data = response;
            console.log("Message Fired");
            setAllMessagesCopy([...allMessages], data);
          });
          socket.emit("newMessage", data);
      };
      useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", userData);
        socket.on("connection", () => {
          setSocketConnectionStatus(!socketConnectionStatus);
        });
      }, []);
      useEffect(() => {
        socket.on("messageReceived", (newMessage) => {
            setAllMessagesCopy([...allMessages], newMessage);
          });
      },[]);
      useEffect(() => {
        axios
          .get(`https://cramixbackend.onrender.com/api/discussions/${chat_id}`)
          .then(({ data }) => {
            setAllMessages(data);
          });
      }, [allMessagesCopy, chat_id]);

    return(
        <div className={"chatArea-container"}>
          <img id='crossdiscussions' src={cross} alt='close' onClick={props.onClick}/>
            <div className={"messages-container"}>
          {allMessages
            .slice(0)
            .reverse()
            .map((message, index) => {
              const sender = message.senderemail;
              const self = userData.email;
              if (sender === self) {
                return <MessageSelf props={message} key={index} />;
              } else {
                return <MessageOthers props={message} key={index} />;
              }
            })}
        </div>
        <div className={"text-input-area"}>
          <input
            placeholder="Type a Message"
            className={"search-box"}
            value={messageContent}
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                sendMessage();
                setMessageContent("");
              }
            }}
          />
          <IconButton
            onClick={() => {
              sendMessage();
            }}
          >
            <SendIcon className={"icon"} />
          </IconButton>
        </div>
        </div>
    );
}
export default Discussions;