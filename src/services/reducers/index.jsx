import { combineReducers } from "redux";
import { burgerReducer } from "./burger-ingredients";
import { viewReducer } from "./view";
import { burgerConstructorReducer } from "./constructor-burger";
import { orderReducer } from "./order";
import {userReducer} from "./user";
import { registrationReducer } from "./register";
import { loginReducer } from "./login";
import { logoutReducer } from "./logout";


export const rootReducer = combineReducers({
  burger: burgerReducer,
  view: viewReducer,
  burgerConstruct: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer,
  register: registrationReducer,
  login: loginReducer,
  logout: logoutReducer
});
