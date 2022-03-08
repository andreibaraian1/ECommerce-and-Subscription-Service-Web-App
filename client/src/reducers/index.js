import { combineReducers } from "redux";
import userReducer from "./user";
import productsReducer from "./products";
import modalReducer from "./modal";
import modalMessageReducer from "./modalMessage";

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  modal: modalReducer,
  modalMessage: modalMessageReducer,
});
export default rootReducer;
