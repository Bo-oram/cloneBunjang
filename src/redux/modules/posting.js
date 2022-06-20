import axios from "axios";

const ADD = "new/Add"


const initialState = {
    list: [],
};

export function postAdd(post) {
    return { type: ADD, post };
}



export const postUpload = (post) => {
    console.log(post);
    return function (dispacth) {
        axios.post("http://13.125.112.232/api/market", post).then((response) => {
            console.log(response.data);
            const newPost = {...post };
            dispacth(postAdd(newPost));
        });
  
    };
};


export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        case "new/ADD": {
            const new_post = [...state.list, action.post];
            // console.log(new_post, "저장했으면 손!");
            return { list: new_post };
          }


        default:
      return state;
  }
}