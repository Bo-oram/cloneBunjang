import "./message.css"
export default function Message({own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img 
                className="messageImg"
                src="https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816__480.jpg" alt="" />
                <p className="messageText">안녕 나는 메시지야</p>
            </div>

            <div className="messageBottom">1시간전</div>


        </div>
    )
}