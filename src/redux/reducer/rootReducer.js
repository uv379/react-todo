import { combineReducers } from "redux";
import infoReducer from "./reducer";

const rootReducer = combineReducers({
  data: infoReducer,
});

export default rootReducer;
