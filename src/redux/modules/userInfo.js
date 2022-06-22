import axios from "axios";




const LOAD = "mypage/LOAD";


const initialState = {
    list: [],
};


export function userinfoLOAD(mypageUser_list) {
    return { type: LOAD, mypageUser_list };
}

//미들웨어
export const userinfoLoadSV = () => {
  let token = localStorage.getItem("userToken")
    return async function (dispatch) {
      try{
        let mypageUser_list = [];
        // console.log(mypageUser_list,"으아아아아");
        const {data} = await axios.get("http://13.125.112.232/api/user/mypage", {
          headers: {Authorization: 'Bearer ' + token }
          
         });
        mypageUser_list = {...data}
        dispatch(userinfoLOAD(mypageUser_list));
      } catch(error){
        console.error(error)
      } 
    };
  };
  
export const changeNicname = (changenickname) => {
  let token = localStorage.getItem("userToken");
  // console.log(nickname);
  return async function (dispatch) {
    try {
      const {data} = await axios.put("http://13.125.112.232/api/user/mypage/nickname",{nickname: changenickname},{
      headers: {Authorization: 'Bearer ' + token }
     })
     window.location.reload()
    } catch (error) {
      window.alert(error.response.data.errorMessage)
    }
    
     
    //  .then((response) => {
    //   console.log(response);
  
    // })
  }
}

export const changeComment = (info) => {
  let token = localStorage.getItem("userToken");
  return async function (dispatch) {
    try{
       await axios.put("http://13.125.112.232/api/user/mypage/info", {userInfo:info},{
      headers: {Authorization: 'Bearer ' + token }
     })
     window.location.reload()
    } catch (error){
      window.alert("수정실패")
    }
   
  }
}

export const loginCheck = () => {
  let token = localStorage.getItem("userToken");
  return async function (dispatch) {
    await axios.get("http://13.125.112.232/api/user/login/me",{
      headers: {
        Authorization: 'Bearer ' + token 
      }
     } ).then(({data}) => {
      const mypageUser_list = {...data}
        dispatch(userinfoLOAD(mypageUser_list));
    })
  }
}



//리듀서
  export default function reducer(state = initialState, action = {}) {
    switch (action.type) {




        case "mypage/LOAD": {
            // console.log(action.mypageUser_list)
            return { list: action.mypageUser_list };
          }


          default:
      return state;
  }
}