
import Product_ from "./modules/productSlice";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userInfo from "../redux/modules/userInfo"
import posting from "../redux/modules/posting"
import searchSV from "./modules/searchSV"
import loginck from "./modules/loginck"

const middlewares = [thunk];
const enhencer = applyMiddleware(...middlewares); //미들웨어

const rootReducer = combineReducers({ userInfo, posting, Product_, searchSV, loginck});

const store = createStore(rootReducer, enhencer);

export default store;
