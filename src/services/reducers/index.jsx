import { combineReducers } from "redux";
import { burgerReducer } from "./list-ingredients";
import { viewReducer } from "./view";
import { constructorReducer } from "./list-ingredients-constructor";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  view: viewReducer,
  construct: constructorReducer,
  order: orderReducer,
});
