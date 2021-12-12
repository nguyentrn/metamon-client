import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createFormData from "../utils/createFormData";

// import server from '../model/Server';

const initialState = {
  address: undefined,
  sign: undefined,
  token: undefined,
  err: undefined,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setErr: (state, action) => {
      state.err = action.payload;
    },
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setToken, setAddress, setErr, toggleLoading } =
  authSlice.actions;

export const login = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true));
    const url = "https://metamon-api.radiocaca.com/usm-api/login";
    const bodyFormData = createFormData(data);

    const res = await axios.post(url, bodyFormData);

    if (res.data.data) {
      dispatch(setToken(res.data.data));
      dispatch(setAddress(data.address));

      // server.setAddress(data.address);
      // const user = await server.checkUser();
      // if (user.result) {
      dispatch(toggleLoading(false));
      // } else {
      //   dispatch(setErr('Tính năng nội bộ!'));
      // }
    } else {
      dispatch(setErr("Thông tin đăng nhập sai!"));
      dispatch(toggleLoading(false));
    }
  } catch (err) {
    dispatch(setErr("Thông tin đăng nhập sai!"));
    dispatch(toggleLoading(false));
    console.log(err);
  }
};

export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectErr = (state) => state.auth.err;

export default authSlice.reducer;
