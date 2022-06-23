import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "../css/detail.css";

const Detail = () => {

  
  const param = useParams();
  const navigate = useNavigate();
  const [detailInfo, setDetailInfo] = useState("info1");
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

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])


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
      <div className="detailContainer">
        {!prdDetail ? null : (
          <>
            <div className="detailMain">
              <div className="detailThumbnail">
                <img src={prdDetail.item.imageUrl} alt="" />
              </div>
              <div className="detailCon">
                <div className="titleBox">
                  <p className="detailTitle">{prdDetail.item.title}</p>
                  <p className="detailPrice">
                    {prdDetail.item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    <span>원</span>
                  </p>
                </div>
                <div>
                  <ul className="infoBox">
                    <li>
                      <span>상품상태</span>{" "}
                      <span>
                        {prdDetail.item.condition ? "새상품" : "중고"}
                      </span>
                    </li>
                    <li>
                      <span>교환여부</span>{" "}
                      <span>
                        {prdDetail.item.exchange ? "교환가능" : "교환불가능"}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="detailBtnArea">
                  <button>찜</button>
                  <button
                    onClick={() => {
                      navigate("/chat", {
                        state: {
                          userId: prdDetail.item.userId,
                          prd: prdDetail,
                        },
                      });
                    }}
                  >
                    연락하기
                  </button>
                  <button>바로구매</button>
                </div>
              </div>
            </div>
            <div className="detailContentBottom">
              <ul>
                <li
                  onClick={() => {
                    setDetailInfo("info1");
                  }}
                  className={detailInfo === "info1" && "active"}
                >
                  상품정보
                </li>
                <li
                  onClick={() => {
                    setDetailInfo("info2");
                  }}
                  className={detailInfo === "info2" && "active"}
                >
                  상품문의
                </li>
              </ul>
              <div className="infoMenu">
                {detailInfo === "info1" ? (
                  <div>
                    <p>상품정보</p>
                    <div>{prdDetail.item.content}</div>
                  </div>
                ) : (
                  <div>
                    <p>상품문의</p>
                    <div>{prdDetail.item.content}</div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Detail;
