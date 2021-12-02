/* eslint-disable import/no-named-as-default */
import { configureStore } from "@reduxjs/toolkit";
import metamonSlice from "./metamonSlice";

export default configureStore({
  reducer: {
    metamon: metamonSlice,
  },
});
