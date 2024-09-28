import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  userLogin,
  userLogout,
  userRegister,
} from "../../services/api/user";
import toast from "react-hot-toast";
export const signUpRequest = createAsyncThunk(
  "USER_REGISTER",
  async ({ data, callback }, thunk) => {
    try {
      const response = await userRegister(data);
      callback(response);
      toast.success("User Registerd in successfully");
      return response;
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
      return thunk.rejectWithValue(errors);
    }
  }
);

export const loginRequest = createAsyncThunk(
  "USER_LOGIN",
  async ({ payload, router, callback }, thunk) => {
    try {
      const response = await userLogin(payload);
      callback(response?.data);
      return { data: response?.data, router: router };
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
      return thunk.rejectWithValue(errors);
    }
  }
);

export const logoutRequest = createAsyncThunk(
  "USER_LOGOUT",
  async ({ router }, thunk) => {
    try {
      await userLogout();
      return { router: router };
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
      return thunk.rejectWithValue(errors);
    }
  }
);

export const getAuthUser = createAsyncThunk("GET_USER", async (thunk) => {
  try {
    const res = await getAuth();
    return res.data.data;
  } catch (errors) {
    const { response } = errors;
    toast.error(response?.data?.message || "Something went wrong");
    return thunk.rejectWithValue(errors);
  }
});
