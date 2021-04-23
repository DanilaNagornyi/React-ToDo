import { combineReducers } from "redux";
import todosReducer from "./todosReducers";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  todos: todosReducer,
  users: userReducer,
})

export default rootReducer;
