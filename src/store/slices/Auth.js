import { api } from '../../utlis/admin/api.utlis';
import { api as userApi } from '../../utlis/user/api.utlis';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./Message";
import ApiService from "../../core/services/ApiService";
const careexchange = JSON.parse(localStorage.getItem("careexchange"));

export const login = createAsyncThunk(
  api.login,
  async ({ email, password, user_type }, thunkAPI) => {
    try {
      const response = await ApiService.postAPI(api.login, { email, password, user_type });
      
      if (!response.data.status) {
        thunkAPI.dispatch(setMessage(response.data.message));
        return thunkAPI.rejectWithValue();
      } else {
        if (response.data.status && response.data.data.token) {
          const body = response.data;
          const localData = { token: body.data.token, userId: body.data.adminUser.userid, email: body.data.adminUser.email, role_id: body.data.adminUser.user_type};
          
          localStorage.setItem("careexchange", JSON.stringify(localData));
          thunkAPI.dispatch(setMessage(response.data.message));
          return { careexchange: response.data };
        } else {
          thunkAPI.dispatch(setMessage("Something went wrong! please try again."));
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
  userApi.login,
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await ApiService.postAPI(userApi.login, { email, otp });
      
      if (!response.data.status) {
        thunkAPI.dispatch(setMessage(response.data.message));
        return thunkAPI.rejectWithValue();
      } else {
        if (response.data.status && response.data.data.token) {
          const body = response.data;
          const localData = { token: body.data.token, userId: body.data.adminUser.userid, email: body.data.adminUser.email, role_id: body.data.adminUser.user_type};
          
          localStorage.setItem("careexchange", JSON.stringify(localData));
          thunkAPI.dispatch(setMessage(response.data.message));
          return { careexchange: response.data };
        } else {
          thunkAPI.dispatch(setMessage("Something went wrong! please try again."));
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

const initialState = careexchange
  ? { isLoggedIn: true, careexchange }
  : { isLoggedIn: false, careexchange: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.careexchange = action.payload.careexchange;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.careexchange = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.careexchange = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;