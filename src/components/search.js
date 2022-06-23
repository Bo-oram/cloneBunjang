import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/Home.css";
import "../css/search.css";
import { itemLoad } from "../redux/modules/searchSV";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const parm = useParams();
  const dispatch = useDispatch();
  const searchItem_list = useSelector((state) => state.searchSV.list);

  const navigate = useNavigate();
  const [way, setWay] = useState("default");
  const prdCount = searchItem_list.length
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  console.log(searchItem_list);
  const wayChange = (e) => {
    setWay(e);
  };
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    dispatch(itemLoad(parm.text, way));
  }, [dispatch, parm.text, way]);

  useEffect(() => {
    setWay("default");
  }, [parm.text]);

  return (
    <>
      <div className="searchTarget_container">
        <div className="content">
          <div className="sortingBox">
            <div className="targetBox">
              <span className="target">{parm.text}</span>의 검색결과<span className="prdCount">{prdCount}개</span>
            </div>
            <div className="sorting">
              <p
                style={way === "default" ? { color: "red" } : null}
                onClick={() => {
                  wayChange("default");
                }}
              >
                정확도순
              </p>
              <p
                style={way === "time" ? { color: "red" } : null}
                onClick={() => {
                  wayChange("time");
                }}
              >
                최신순
              </p>
              <p
                style={way === "d_price" ? { color: "red" } : null}
                onClick={() => {
                  wayChange("d_price");
                }}
              >
                저가순
              </p>
              <p
                style={way === "a_price" ? { color: "red" } : null}
                onClick={() => {
                  wayChange("a_price");
                }}
              >
                고가순
              </p>
            </div>
          </div>
          <div className="prdContent">
              {searchItem_list.map((item, i) => (
                  <div
                    className="item"
                    style={{ width: "200px", height: "300px" }}
                    key={i}
                    onClick={()=>{navigate("/detail/" + item.itemId)}}
                  >
                    <div className="thumb">
                      <img src={item.imageUrl} alt="" />
                    </div>
                    <div className="prdInfo">
                      <p className="prdTitle">{item.title}</p>
                      <div>
                        <p className="price">
                          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          <span>원</span>
                        </p>
                        <span className="time">{item.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
