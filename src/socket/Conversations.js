import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./conversations.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    let friend_id = conversation.map((f) => {
      return f.members.find((m) => m !== currentUser);
    });


    const getUser = async () => {
      try {
        const res = await axios(
          'http://13.125.112.232/api/user?userId=' + friend_id);
        console.log(res.data);
        setUser(res.data)
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div>
      <div className="conversation">
        {
          
        }
      </div>
    </div>
  );
}
