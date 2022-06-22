import React, {  useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { prdAll_list } from "../redux/modules/productSlice";
import "../css/Home.css";
import subBn from "../img/subBn.png";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  let allPrd = useSelector((state) => state.Product_.prdItem.Items);
  let prdlist = allPrd === undefined ? [] : allPrd;

  //api데이터 가져오기 실행
  useEffect(() => {
    dispatch(prdAll_list());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="mainBnContainer">
        <img
          src="https://media.bunjang.co.kr/images/nocrop/837884543_w2058.jpg"
          alt=""
        />
      </div>
      <div className="subBn">
        <div className="subBnItem">
          <img src={subBn} alt="" />
        </div>
      </div>

      <div className="prdListContainer">
        <div className="title">오늘의 상품 추천</div>
        <div className="prdContent">
          {prdlist.map((p, idx) => {
            return (
              <div className="item" key={idx} onClick={() => { navigate("/detail/" + p.itemId); }}>
                <div className="thumb">
                  <img src={p.imageUrl} alt="" />
                </div>
                <div className="prdInfo">
                  <p className="prdTitle">{p.title}</p>
                  <div>
                    <p className="price">
                      {p.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      <span>원</span>
                    </p>
                    <span className="time">{p.createdAt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
