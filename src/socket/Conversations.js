import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./conversations.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const friendId = conversation.find((m) => m === currentUser.id);

    const getUser = async () => {
      try {
        const res = await axios("유저 얻어오는 주소인갑?userId=" + friendId);
        setUser(res.data)

      } catch (e) {
        console.log(e);
      }
    };
  }, [conversation, currentUser]);

  return (
    <div>
      <div className="conversation">
        <img
          className="conversationImg"
          src={user.img}
          //src = {유저 프로필 이미지가 있다면 ? 프로필 이미지 : 아니면 기본 이미지}
          alt=""
        />
        <span className="conversationName">{user.username}</span>
      </div>
    </div>
  );
}
