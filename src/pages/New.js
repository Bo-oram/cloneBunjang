import React from "react";

const New = () => {
  return (
    <div>
      <div className="title">기본정보</div>

      <div>
        상품이미지
        <input type="file" />
      </div>


      <div>
        제목
        <input type="text" />
      </div>


      <div>
        거래지역
        <label htmlFor="내위치">
          <input type="radio" id="내위치" name="거래지역" />
          내위치
        </label>
        <label htmlFor="최근지역">
          <input type="radio" id="최근지역" name="거래지역"/>
          최근지역
        </label>
        <label htmlFor="주소 검색">
          <input type="radio" id="주소" name="거래지역"/>
          주소
        </label>
        <label htmlFor="지역설정안함">
          <input type="radio" id="지역설정안함" name="거래지역"/>
          지역설정안함
        </label>
        <div>여기에 선택된 내용 보여지도록</div>
      </div>


      <div>
        상태
        <label htmlFor="중고상품">
          <input type="radio" id="중고상품" name="상태" />
          중고상품
        </label>
        <label htmlFor="새상품">
          <input type="radio" id="새상품" name="상태"/>
          새상품
        </label>
      </div>


      <div>
        교환
        <label htmlFor="교환불가">
          <input type="radio" id="교환불가" name="교환"/>
          교환불가
        </label>
        <label htmlFor="교환가능">
          <input type="radio" id="교환가능" name="교환"/>
          교환가능
        </label>
      </div>


      <div>
        가격
       <input type="text" />
      
       <label htmlFor="배송비포함">
          <input type="radio" id="배송비포함" name="배송비포함"/>
          배송비포함
        </label>       
      </div>


      <div>
        설명
        <input type="text" />
      </div>

      
      <div>
        수량
        <input type="text" />개
      </div>
    </div>
  );
};

export default New;
