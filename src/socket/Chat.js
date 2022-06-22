import React, { useEffect, useState } from "react";
import { loginCheck } from "../redux/modules/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Conversation from "./Conversations";
import "./chat.css";
import Message from "./Message";
import axios from "axios";

export const SocketContext = React.createContext();

export default function Chat() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [chats, setchats] = useState([]);
  const [Msg, setMessage] = useState("");
  const [socket, setSocket] = useState(io("ws://13.125.112.232:8900"));
  const state_ = location

  console.log(state_.state.userId)



  useEffect(() => {
    setSocket(io("ws://13.125.112.232:8900"));
  }, []);

  useEffect(() => {
    socket.on("welcome", (message) => {
      console.log(message);
    });
  }, [socket]);

  const sendMessage = () => {
    console.log(Msg);
    setchats(chats.concat(`"닉네임" : ${Msg}`));
    socket.emit("new message", Msg);
    setMessage("");
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  //여기부터 강의 따라한 것

  //유저인증이... 일단 me로 불러와 두었음
  const user = useSelector((state) => state.userInfo.list.userId);
  console.log(user)
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    dispatch(loginCheck());
  }, []);

  useEffect(() => {
    const agetConversations = async () => {
      try {
        const res = await axios.get("서버주소?" + user);
        setConversations(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    agetConversations();
  }, [user]);

   


  const chatList = async () => {
    try{      
      const response = await axios.get(`http://13.125.112.232/conversations/find/:${state_.state.userId}/:${user}`);
      response.data === null && addChatList()
    }catch(e){
      console.log(e)
    }   
    
  }
  const addChatList = async () => {

  }

  

  return (
    <>
      <div className="chatContainer">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="친구 검색" />
            {conversations.map((c) => (
              <Conversation conversation={c} currentUser={user} />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true} />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="여기에 채팅을 써보렴"
              ></textarea>
              <button className="chatSubmitButton" onClick={chatList}>보내기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
