import { combineReducers } from "redux";
import { burgerReducer } from "./burger-ingredients";
import { viewReducer } from "./view";
import { burgerConstructorReducer } from "./constructor-burger";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  view: viewReducer,
  burgerConstruct: burgerConstructorReducer,
  order: orderReducer,
});
