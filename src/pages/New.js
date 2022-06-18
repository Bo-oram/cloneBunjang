import React, { useRef, useState } from "react";
import {useDispatch} from "react-redux"
import { postUpload } from "../redux/modules/posting";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { storage } from "../shard/firebase";
import styled from "styled-components";
const New = () => {

  const dispatch = useDispatch()

  const title = React.useRef(null)
  const price = React.useRef(null)
  const comment = React.useRef(null)
  const count = React.useRef(null)
  const img = React.useRef(null);
  const file_link_ref = React.useRef(null)
  const [address, setAddress] = useState("내 위치")
  const [item, setItem] = useState("중고상품")
  const [trade, setTrade] = useState("교환불가")

  const addressClick = (e) =>{
    setAddress(e.target.value)
  }
  const itemClick = (e) =>{
    setItem(e.target.value)
  }
  const tradeClick = (e) =>{
    setTrade(e.target.value)
  }

  const [imageSrc, setImageSrc] = useState('');


  const encodeFileToBase64 =(fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const fileUp = async () => {
    const uploadfile = await uploadBytes(
      ref(storage, `images/${img.current.files[0].name}`),
      img.current.files[0]);
    const file_url = await getDownloadURL(uploadfile.ref);
    file_link_ref.current = { url: file_url }
  }

  const addPost = () => {
    window.setTimeout(() => {
    dispatch(postUpload({
      imageUrl : file_link_ref.current.url,
      title : title.current.value,
      location : address,
      condition : item,
      exchange : trade,
      price : parseInt(price.current.value) ,
      content : comment.current.value,
      count : parseInt(count.current.value) 
    }))
  }, 2000);
  }

  return (
    <div>
      <div className="title">기본정보</div>

      <div>
        상품이미지
        <input type="file" 
        ref={img}
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
        />
      </div>


      <div>
        {imageSrc && <Image src={imageSrc} alt="preview-img" />}
      </div>


      <div>
        제목
        <input ref={title} type="text" />
      </div>


      <div>
        거래지역
        <label htmlFor="내위치">
          <input type="radio" id="내위치" name="거래지역" value={"내 위치"} onClick={addressClick}/>
          내위치
        </label>
        <label htmlFor="최근지역">
          <input type="radio" id="최근지역" name="거래지역" value={"최근지역"} onClick={addressClick}/>
          최근지역
        </label>
        <label htmlFor="주소 검색">
          <input type="radio" id="주소" name="거래지역" value={"주소"} onClick={addressClick}/>
          주소
        </label>
        <label htmlFor="지역설정안함">
          <input type="radio" id="지역설정안함" name="지역설정안함" value={"지역설정안함"} onClick={addressClick}/>
          지역설정안함
        </label>
        <div>여기에 선택된 내용 보여지도록</div>
      </div>


      <div>
        상태
        <label htmlFor="중고상품">
          <input type="radio" id="중고상품" name="상태" value={"중고상품"} onClick={itemClick} />
          중고상품
        </label>
        <label htmlFor="새상품">
          <input type="radio" id="새상품" name="상태" value={"새상품"} onClick={itemClick}/>
          새상품
        </label>
      </div>


      <div>
        교환
        <label htmlFor="교환불가">
          <input type="radio" id="교환불가" name="교환" value={"교환불가"} onClick={tradeClick}/>
          교환불가
        </label>
        <label htmlFor="교환가능">
          <input type="radio" id="교환가능" name="교환" value={"교환가능"} onClick={tradeClick}/>
          교환가능
        </label>
      </div>


      <div>
        가격
       <input ref={price} type="text" />
      
       <label htmlFor="배송비포함">
          <input type="radio" id="배송비포함" name="배송비포함"/>
          배송비포함
        </label>       
      </div>


      <div>
        설명
        <input ref={comment} type="text" />
      </div>

      
      <div>
        수량
        <input ref={count} type="text" />개
      </div>
      <button onClick={()=>{fileUp(); addPost()}}>등록하기</button>
    </div>
    
  );
};


const Image = styled.img`
width:50px;
height:50px;
`;

export default New;
