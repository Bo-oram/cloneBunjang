import React from "react";


const Qick = () => {
    return(
        <>
        <div className="qickBar">
            <div className="wishList conBox"><p className="conTitle">찜한상품</p></div>
            <div className="recentCon conBox">
                <p className="conTitle">최근본상품</p>
                <p className="conCount">5</p>
                <div>이미지</div>
                <div>이미지</div>
                <div>이미지</div>
            </div>
            <div className="conBox app">
                <p className="conTitle">앱다운로드</p>
                <div>이미지</div>
            </div>
            <div className="conBox">
                Top
            </div>
        </div>
        
        </>
    )
}

export default Qick