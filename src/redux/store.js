import { configureStore } from "@reduxjs/toolkit";
import othersSlice from "./othersSlice";
import statsSlice from "./statsSlice";
import navSlice from "./navSlice";
import authSlice from "./authSlice";
import gameSlice from "./gameSlice";

export default configureStore({
  reducer: {
    stats: statsSlice,
    nav: navSlice,
    others: othersSlice,
    auth: authSlice,
    game: gameSlice,
  },
});
