import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  DeleteSingleModule,
  getProducts,
  getSingleModule,
} from "./moduleThunk";
const moduleSlice = createSlice({
  name: "moduleSlice",
  status: "idle",
  initialState: {
    data: {},
    status: "idle",
    detail: null,
    detailStatus: "idle",
    actionStatus: "idle",
  },
  extraReducers: (builder) => {
    // Get Modules
    builder.addCase(getProducts.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = "failed";
    });

    // Get Single Module Detail
    builder.addCase(getSingleModule.pending, (state, action) => {
      state.detailStatus = "loading";
    });

    builder.addCase(getSingleModule.fulfilled, (state, action) => {
      state.detail = action.payload?.data;
      state.detailStatus = "success";
    });

    builder.addCase(getSingleModule.rejected, (state, action) => {
      state.detailStatus = "failed";
    });

    // Delete Single Module Detail
    builder.addCase(DeleteSingleModule.pending, (state, action) => {
      state.actionStatus = "loading";
    });

    builder.addCase(DeleteSingleModule.fulfilled, (state, action) => {
      state.actionStatus = "success";
    });

    builder.addCase(DeleteSingleModule.rejected, (state, action) => {
      state.actionStatus = "failed";
    });
  },
});

export default moduleSlice.reducer;
