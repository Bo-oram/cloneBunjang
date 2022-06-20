import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../css/Signup.css";
import appImg from "../img/appimg.svg";

const Signup = ({ loginClose }) => {
  const [location, setLocation] = useState("signIn");
  const nickRef = useRef(null);
  const emailRef = useRef(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nickname, setNickname] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [userporfilUrl, setUserporfilUrl] = useState();

  const userInfo = {
    email: email,
    password: password,
    nickname: nickname,
    confirmpassword: confirmpassword,
    userporfilUrl: userporfilUrl,
  };
  
  //회원가입 요청 로직
  async function userRegister() {
    if (location === "signIn") {
      setLocation("signup");
    } else if (location === "signup") {
      console.log("회원가입 요청");
      await axios
        .post("http://13.125.112.232/api/user/signup", userInfo)
        .then((Response)=>{console.log(Response)})
        .catch(function (error) {
          console.log(error);
        });
    }
    console.log(userInfo);
  }

  //로그인 요청 로직
  async function userLogin() {
    if (location === "signup") {
      setLocation("signIn");
    } else if (location === "signIn") {
      console.log("로그인 요청");
      //로그인로직
    }
  }

  useEffect(() => {
    if (location === "signup") {
      nickRef.current.focus();
    } else if (location === "signIn") {
      emailRef.current.focus();
    }
  }, [location]);

  return (
    <div className="signupModal">
      <div className="background" onClick={loginClose}></div>
      <div className="modal">
        <div className="titleBox">
          <img src={appImg} alt="" className="appImg" />
          <h2 className="title">번개장터로 중고거래 시작하기</h2>
          <p className="subTitle">간편하게 가입하고 상품을 확인하세요</p>
        </div>
        <div>
          <form action="" className="loginFrom">
            {location === "signup" ? (
              <label htmlFor="">
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  ref={nickRef}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
              </label>
            ) : null}

            <label htmlFor="">
              <input
                type="text"
                placeholder="이메일을 입력해주세요"
                ref={emailRef}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label htmlFor="">
              <input
                type="text"
                placeholder="비밀번호를 입력해주세요"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            {location === "signup" ? (
              <>
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder="비밀번호 재입력"
                    onChange={(e) => {
                      setConfirmpassword(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="">
                  <textarea
                    placeholder="간단한 소개 부탁드려요 :)"
                    onChange={(e) => {
                      setUserporfilUrl(e.target.value);
                    }}
                  />
                </label>
              </>
            ) : null}

            <div className="buttonArea">
              <p
                className={`${location === "signup" ? "on" : "off"}`}
                onClick={() => {
                  userRegister();
                }}
              >
                회원가입
              </p>
              <p
                className={`${location === "signIn" ? "on" : "off"}`}
                onClick={() => {
                  userLogin();
                }}
              >
                로그인
              </p>
            </div>
          </form>
          <button className="closeBtn" onClick={loginClose}>
            X
          </button>
        </div>
        <div className="subInfo">
          도움이 필요하면 이메일 또는 고객센터1670-2910로 문의 부탁드립니다.
          <br />
          고객센터 운영시간: 09~18시 (점심시간 12~13시, 주말/공휴일 제외)
        </div>
      </div>
    </div>
  );
};

export default Signup;
