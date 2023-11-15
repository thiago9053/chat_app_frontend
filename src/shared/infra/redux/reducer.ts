import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "@/modules/foo/slices";
import menuReducer from "@/modules/sidebar/slices/menu";

export const rootReducer = combineReducers({
  counter: counterReducer,
  menu: menuReducer,
});
