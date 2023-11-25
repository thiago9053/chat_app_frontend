import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "@/modules/foo/slices";
import menuReducer from "@/modules/sidebar/slices/menu";
import profileReducer from "@/modules/sidebar/slices/profile";

export const rootReducer = combineReducers({
  counter: counterReducer,
  menu: menuReducer,
  profile: profileReducer,
});
