import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "@/modules/foo/slices";
import menuReducer from "@/modules/sidebar/slices/menu";
import profileReducer from "@/modules/sidebar/slices/profile";
import themeReducer from "@/modules/sidebar/slices/themes";
import applicationsReducer from "@/modules/sidebar/slices/applications";

export const rootReducer = combineReducers({
  counter: counterReducer,
  menu: menuReducer,
  profile: profileReducer,
  theme: themeReducer,
  applications: applicationsReducer,
});
