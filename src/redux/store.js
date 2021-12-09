import { configureStore } from "@reduxjs/toolkit";
import othersSlice from "./othersSlice";
import statsSlice from "./statsSlice";
import navSlice from "./navSlice";

export default configureStore({
  reducer: {
    stats: statsSlice,
    nav: navSlice,
    others: othersSlice,
  },
});
