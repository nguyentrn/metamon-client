import { createSlice } from "@reduxjs/toolkit";
import Server from "../model/Server";

const initialState = {
  token: undefined,
  role: undefined,
  addresses: undefined,
  err: undefined,
  isLoggingIn: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setErr: (state, action) => {
      state.err = action.payload;
    },
    toggleIsLoggingIn: (state, action) => {
      state.isLoggingIn = action.payload;
    },
  },
});

export const { setToken, setRole, setAddresses, setErr, toggleIsLoggingIn } =
  authSlice.actions;

export const initUser = (token) => async (dispatch) => {
  try {
    const server = new Server(token);
    const user = await server.checkUser();
    dispatch(setToken(token));
    dispatch(setRole(user.result.role));
    dispatch(setAddresses(user.result.addresses));
  } catch (err) {
    dispatch(setErr("Thông tin đăng nhập sai!"));
    dispatch(toggleIsLoggingIn(false));
    console.log(err);
  }
};

export const selectAddresses = (state) => state.auth.addresses;
export const selectErr = (state) => state.auth.err;
export const selectIsLoggingIn = (state) => state.auth.isLoggingIn;

export default authSlice.reducer;
