import { api } from "../../utlis/admin/api.utlis";
import { api as userApi } from "../../utlis/user/api.utlis";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./Message";
import ApiService from "../../core/services/ApiService";
import { routes } from "../../utlis/admin/routes.utlis";
import { routes as userRoutes } from "../../utlis/user/routes.utlis";
import { routes as providerRoutes } from "../../utlis/provider/routes.utlis";
import { routes as staffRoutes } from "../../utlis/staff/routes.utlis";
const careexchange = JSON.parse(localStorage.getItem("careexchange"));

export const login = createAsyncThunk(
  api.login,
  async ({ email, password, user_type }, thunkAPI) => {
    try {
      const response = await ApiService.postAPI(api.login, {
        email,
        password,
        user_type,
      });

      if (!response.data.status) {
        thunkAPI.dispatch(setMessage(response.data.message));
        return thunkAPI.rejectWithValue();
      } else {
        if (response.data.status && response.data.data.token) {
          const body = response.data;
          const localData = {
            token: body.data.token,
            userId: body.data.adminUser.userid,
            email: body.data.adminUser.email,
            role_id: body.data.adminUser.user_type,
          };

          localStorage.setItem("careexchange", JSON.stringify(localData));
          thunkAPI.dispatch(setMessage(response.data.message));
          return { careexchange: response.data };
        } else {
          thunkAPI.dispatch(
            setMessage("Something went wrong! please try again.")
          );
          return thunkAPI.rejectWithValue();
        }
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const verifyOtp = createAsyncThunk(
  userApi.otpVerify,
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await ApiService.postAPI(userApi.otpVerify, {
        email,
        otp,
      });

      if (!response.data.status) {
        thunkAPI.dispatch(setMessage(response.data.message));
        return thunkAPI.rejectWithValue();
      } else {
        if (response.data.status && response.data.data.token) {
          const body = response.data;
          const localData = {
            token: body.data.token,
            userId: (body.data.user.user_type == 2 || body.data.user.user_type == 3) ? body.data.user.provider_id : body.data.user.userid,
            email: body.data.user.email,
            fullname: body.data.user.fullname,
            mobile: body.data.user.mobile,
            role_id: body.data.user.user_type,
          };

          localStorage.setItem("careexchange", JSON.stringify(localData));
          thunkAPI.dispatch(setMessage(response.data.message));
          return { careexchange: response.data };
        } else {
          thunkAPI.dispatch(
            setMessage("Something went wrong! please try again.")
          );
          return thunkAPI.rejectWithValue();
        }
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk(api.logout, async () => {
  localStorage.removeItem("careexchange");
});

export const userLogout = createAsyncThunk(userApi.logout, async () => {
  localStorage.removeItem("careexchange");
});

// const initialState = careexchange
//   ? careexchange.role_id == 4
//     ? { isLoggedIn: true, careexchange, redirect: routes.dashboard }
//     : careexchange.role_id == 1
//     ? { isLoggedIn: true, careexchange, redirect: userRoutes.dashboard }
//     : { isLoggedIn: false, careexchange: null, redirect: null }
//   : { isLoggedIn: false, careexchange: null, redirect: null };

const initialState = careexchange ? (
  careexchange.role_id == 4 ? (
    { isLoggedIn: true, careexchange, redirect: routes.dashboard }
  ) :
  (
    careexchange.role_id == 1 ? (
      { isLoggedIn: true, careexchange, redirect: userRoutes.dashboard }
    ) : (
      careexchange.role_id == 2 ? (
        { isLoggedIn: true, careexchange, redirect: providerRoutes.dashboard }
      ) :
      (
        careexchange.role_id == 3 ? (
          { isLoggedIn: true, careexchange, redirect: staffRoutes.dashboard }
        ) :
        ({ isLoggedIn: false, careexchange: null, redirect: null })
      )
    )
  )
) :
({ isLoggedIn: false, careexchange: null, redirect: null });

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [verifyOtp.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.redirect = ((action.payload.careexchange.data.user.user_type == 1) ? userRoutes.dashboard : (action.payload.careexchange.data.user.user_type == 2 ? providerRoutes.dashboard : staffRoutes.dashboard));
      state.careexchange = action.payload.careexchange;
    },
    [verifyOtp.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.redirect = null;
      state.careexchange = null;
    },
    [userLogout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.redirect = null;
      state.careexchange = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.redirect = routes.dashboard;
      state.careexchange = action.payload.careexchange;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.redirect = null;
      state.careexchange = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.redirect = null;
      state.careexchange = null;
    },
  },
});

const { reducer } = authSlice;

export default reducer;
