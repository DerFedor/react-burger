import { combineReducers } from "redux";
import { burgerReducer } from "./burger-ingredients";
import { viewReducer } from "./view";
import { constructorReducer } from "./constructor-burger";
import { orderReducer } from "./order";
import {userReducer} from "./user";
import { registrationReducer } from "./register";
import { loginReducer } from "./login";
import { logoutReducer } from "./logout";
import { passwordResetReducer } from "./reset-password";
import {feedReducer} from "./feed-view";
import {wsReducer} from "./ws-reducer";
import {ordersReducerTemporary} from "./feeds-list";


export const rootReducer = combineReducers({
  burger: burgerReducer,
  view: viewReducer,
  construct: constructorReducer,
  order: orderReducer,
  user: userReducer,
  register: registrationReducer,
  login: loginReducer,
  logout: logoutReducer,
  password: passwordResetReducer,
  feed: feedReducer,
  websocket: wsReducer,
  temporaryOrder: ordersReducerTemporary
});
