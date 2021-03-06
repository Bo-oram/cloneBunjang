import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../shard/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../css/Signup.css";
import appImg from "../img/appimg.svg";
import { async } from "@firebase/util";

const Signup = ({ loginClose, user_login }) => {
  const pwRef = useRef();
  const nickRef = useRef(null);
  const emailRef = useRef(null);
  const file_link_ref = useRef("");
  const img = useRef();
  const [location, setLocation] = useState("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [userprofileUrl, setUserprofileUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  const fileUp = async (e) => {
    const uploadfile = await uploadBytes(
      e.target.files === null
        ? null
        : ref(storage, `images/${img.current.files[0].name}`),
      e.target.files[0]
    );
    const file_url = await getDownloadURL(uploadfile.ref);
    file_link_ref.current = { url: file_url };
    setUserprofileUrl(file_link_ref.current.url);
  };

  //회원가입 요청 로직
  const userInfo = {
    email: email,
    password: password,
    nickname: nickname,
    confirmpassword: confirmpassword,
    userprofileUrl: userprofileUrl,
  };
  console.log(userprofileUrl);
  async function userRegister() {
    if (location === "signIn") {
      return setLocation("signup");
    } else if (location === "signup") {
      if (
        !email ||
        !password ||
        !nickname ||
        !confirmpassword ||
        !img.current.value
      ) {
        return window.alert("모두 입력해주세요");
      }
      if (!reg_email.test(email)) {
        return alert("이메일 형식을 지켜주세요!");
      } else if (password !== confirmpassword) {
        return alert("비밀번호가 일치하지 않아요!");
      } else {
        console.log("회원가입 요청");
        try {
          const { data } = await axios.post(
            "http://13.125.112.232/api/user/signup",
            userInfo
          );
          console.log(data);
          alert("회원가입 성공!")
          setLocation("signIn");
          pwRef.current.value = "";
        } catch (error) {
          alert(error.response.data.errorMessage);
        }
      }
    }
  }

  const userLogin = async () => {
    if (location === "signup") {
      setLocation("signIn");
      pwRef.current.value = "";
    } else if (location === "signIn") {
      try {
        const { data } = await axios.post(
          "http://13.125.112.232/api/user/login",
          {
            email: email,
            password: password,
          }
        );
        console.log(data);
        localStorage.setItem("userToken", data.token);
        alert("로그인 성공!")
        loginClose();
        user_login();
      } catch (error) {
        window.alert(error);
      }
    }
  };

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
                type="password"
                placeholder="비밀번호(영문,숫자,특수문자포함 6글자 이상)"
                ref={pwRef}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            {location === "signup" ? (
              <>
                <label htmlFor="">
                  <input
                    type="password"
                    placeholder="비밀번호 재입력"
                    onChange={(e) => {
                      setConfirmpassword(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="">
                  <input
                    type="file"
                    onChange={(e) => {
                      fileUp(e);
                    }}
                    accept="image/jpg, image/jpeg, image/png"
                    ref={img}
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
