import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  // Các reducers khác của bạn
});

export default rootReducer;
