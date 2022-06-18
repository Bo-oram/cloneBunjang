// import {configureStore} from "@reduxjs/toolkit"
// import Product_ from "./modules/productSlice";

// const store = configureStore({
//     reducer:{Product_}
// })

// export default store;



import Product_ from "./modules/productSlice";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userInfo from "../redux/modules/userInfo"
import posting from "../redux/modules/posting"

const middlewares = [thunk];
const enhencer = applyMiddleware(...middlewares); //미들웨어

const rootReducer = combineReducers({ userInfo, posting, Product_});
//루트 리듀서를 만들어서  ----->컴바인 (리듀서 모음)을가지고 크리에이트 스토어를 만든다.
const store = createStore(rootReducer, enhencer);

export default store;
