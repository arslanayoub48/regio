import { combineReducers, configureStore } from "@reduxjs/toolkit";
import LayoutReducer from "./layouts/reducer";
import AuthReducer from "./auth/authSlice";
import ModuleSlice from "./modules/moduleSlice";
const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Auth: AuthReducer,
  Module: ModuleSlice,
});
export default rootReducer;
