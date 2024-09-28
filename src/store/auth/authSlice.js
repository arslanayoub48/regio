import { createSlice } from "@reduxjs/toolkit";
import {
  getAuthUser,
  loginRequest,
  logoutRequest,
  signUpRequest,
} from "./authThunk";
import { removeCookie, setCookie } from "../../utils/helpers";
import toast from "react-hot-toast";

const authSlice = createSlice({
  name: "authSlice",
  status: "idle",
  initialState: {
    userProfile: {},
    adminRole: "",
    isAuthenticated: false,
    status: "idle",
  },
  token: "",
  reducers: {
    updateTermsCondition(state, action) {
      state.userProfile.agreed_terms = action.payload;
    },
    updateProfileData(state, action) {
      const payload = action.payload;
      let userBasic = {};
      let mainValues = {};
      Object.keys(state.userProfile.userBasic).forEach((key) => {
        if (payload[key]) {
          userBasic[key] = payload[key];
        } else {
          userBasic[key] = state.userProfile.userBasic[key];
        }
      });
      Object.keys(state.userProfile).forEach((key) => {
        if (key == "country_id") {
          if (payload[key]?.value) {
            mainValues[key] = payload[key]?.value;
            return;
          } else {
            mainValues[key] = "";
            return;
          }
        }
        if (key !== "userBasic" && payload[key]) {
          mainValues[key] = payload[key];
        } else if (key !== "userBasic" && !payload[key]) {
          mainValues[key] = state.userProfile[key];
        }
      });
      console.log({ ...state.userProfile, ...mainValues, userBasic });
      state.userProfile = { ...state.userProfile, ...mainValues, userBasic };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      const res = action.payload?.data;
      if (res?.data?.is_otp_verified !== 0) {
        toast.success("User Logged in successfully");
        setCookie("regio-auth", res?.token, 24);
        window.location.href = "/dashboard";
        state.token = res?.token;
      }
      state.userProfile = res?.data;
      state.status = "success";
    });

    builder.addCase(loginRequest.rejected, (state, action) => {
      state.status = "failed";
    });
    // Resgister Slices
    builder.addCase(signUpRequest.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(signUpRequest.fulfilled, (state, action) => {
      state.status = "success";
      if (action.payload?.data?.status !== "error") {
        state.userProfile = action.payload?.data?.data;
        state.token = action.payload?.data?.token;
      }
    });
    builder.addCase(signUpRequest.rejected, (state, action) => {
      state.status = "failed";
    });
    // Logout Slices
    builder.addCase(logoutRequest.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(logoutRequest.fulfilled, (state, action) => {
      state.status = "success";
      if (action.payload?.data?.status !== "error") {
        removeCookie("regio-auth");
        state.token = "";
        action.payload.router("/");
      }
    });
    builder.addCase(logoutRequest.rejected, (state, action) => {
      state.status = "failed";
    });
    // Auth User Slices
    builder.addCase(getAuthUser.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getAuthUser.fulfilled, (state, action) => {
      state.status = "success";
      state.userProfile = action.payload;
      const getRole = action.payload?.roles?.find(
        (x) => x.slug == "regional-admin" || x.slug == "super-admin"
      );
      if (getRole) {
        state.adminRole = getRole.slug;
      }
    });
    builder.addCase(getAuthUser.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

export const { updateTermsCondition, updateProfileData } = authSlice.actions;

export default authSlice.reducer;
