import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import { chatReducer } from "./chatReducer";
import userReducer from './userReducer';

const rootReducer = combineReducers({
    userState: userReducer,
    articleState: articleReducer,
    chatState: chatReducer,
})

export default rootReducer;