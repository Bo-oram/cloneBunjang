import axios from "axios";

const CHECK = "login/CHECK";


const initialState = {
    list: [],
};


export function loginLOAD(User_list) {
    return { type: CHECK, User_list };
}

//미들웨어
export const loginCheck = () => {
    let token = localStorage.getItem("userToken");
    return async function (dispatch) {
      await axios.get("http://13.125.112.232/api/user/login/me",{
        headers: {
          Authorization: 'Bearer ' + token 
        }
       } ).then(({data}) => {
        const User_list = {...data}
          dispatch(loginLOAD(User_list));
      })
    }
  }


//리듀서
  export default function reducer(state = initialState, action = {}) {
    switch (action.type) {




        case "login/CHECK": {
           
            return { list: action.User_list };
          }


          default:
      return state;
  }
}