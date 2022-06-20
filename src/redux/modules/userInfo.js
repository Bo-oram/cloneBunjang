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
    return async function (dispatch) {
      await axios.get("http://0.0.0.0/api/user/mypage").then((response) => {
        console.log(response);
  
        let mypageUser_list = [];
        response.data.forEach((res) => {
        mypageUser_list.push({...res});
        console.log(mypageUser_list);
        dispatch(userinfoLOAD(mypageUser_list));
        });
      });
    };
  };
  
export const changeNicname = (nickname) => {
  return async function (dispatch) {
    await axios.put("http://0.0.0.0/api/user/mypage/nickname", nickname).then((response) => {

    //어떤 스테이트 남길지 의논
    })
  }
}

export const changeComment = (info) => {
  return async function (dispatch) {
    await axios.put("http://0.0.0.0/api/user/mypage/info", info).then((response) => {

    //어떤 스테이트 남길지 의논
    })
  }
}

export const loginCheck = () => {
  let token = localStorage.getItem("userToken");
  return async function (dispatch) {
    await axios.get("http://13.125.112.232/api/user/login/me",{
      headers: {
        Authorization: 'Bearer ' + token 
      }
     } ).then((response) => {
      console.log(response);
    //어떤 스테이트 남길지 의논
    })
  }
}



//리듀서
  export default function reducer(state = initialState, action = {}) {
    switch (action.type) {




        case "mypage/LOAD": {
            // console.log(action.mypageUser_list);
            return { list: action.mypageUser_list };
          }


          default:
      return state;
  }
}