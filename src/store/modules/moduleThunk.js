import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteSingleModuleRecord,
  getProductsRecords,
  getSingleModuleRecord,
  userLogin,
  userRegister,
} from "../../services/api/user";
import toast from "react-hot-toast";
export const getProducts = createAsyncThunk(
  "GET_PRODUCTS",
  async ({ data, callback, slug, page, search }, thunk) => {
    try {
      const response = await getProductsRecords(slug, page, search);
      if (callback) callback(response);
      return response?.data;
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
      return thunk.rejectWithValue(errors);
    }
  }
);

export const getSingleModule = createAsyncThunk(
  "GET_SINGLE_MODULE",
  async ({ slug, id }, thunk) => {
    try {
      const response = await getSingleModuleRecord(slug, id);
      return response?.data;
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
      return thunk.rejectWithValue(errors);
    }
  }
);

export const DeleteSingleModule = createAsyncThunk(
  "DELETE_SINGLE_MODULE",
  async ({ slug, id, callback }, thunk) => {
    try {
      const response = await deleteSingleModuleRecord(slug, id);
      toast.success(response?.data?.message);
      callback();
      return response?.data;
    } catch (errors) {
      const { response } = errors;
      toast.error(response?.data?.message || "Something went wrong");
      return thunk.rejectWithValue(errors);
    }
  }
);
