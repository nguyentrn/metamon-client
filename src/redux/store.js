import { configureStore } from "@reduxjs/toolkit";
import marketSlice from "./marketSlice";
import statsSlice from "./statsSlice";
import authSlice from "./authSlice";
import gameSlice from "./gameSlice";

export default configureStore({
  reducer: {
    stats: statsSlice,
    market: marketSlice,
    auth: authSlice,
    game: gameSlice,
  },
});
