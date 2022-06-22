import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Detail = () => {
  const param = useParams();
  const navigate = useNavigate();
  const initialState = [];
  const [prdDetail, setPrdDetail] = useState({
    item: {
      condition: "",
      content: "",
      count: "",
      createdAt: "",
      exchange: "",
      id: "",
      imageUrl: "",
      itemId: "",
      location: "",
      nickname: "",
      price: "",
      title: "",
      updatedAt: "",
      userId: "",
      __v: "",
      _id: "",
    },
  });

  useEffect(() => {
    const detail = async () => {
      const response = await axios.get(
        `http://13.125.112.232/market/${param.id}`
      );
      return setPrdDetail(response.data);
    };
    detail();
  }, []);

  return (
    <>
      <div>
        {!prdDetail ? null : <div>{prdDetail.item.title}</div>}
        <button
          onClick={() => {
            navigate("/chat",{
                state:{userId:prdDetail.item.userId, prd:prdDetail}
            });
          }}
        >
          톡으로 가는 버튼
        </button>
      </div>
    </>
  );
};

export default Detail;
