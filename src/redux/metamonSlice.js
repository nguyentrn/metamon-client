/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  metamons: {},
};

export const metamonMarketSlice = createSlice({
  name: "metamonMarket",
  initialState,
  reducers: {
    setMetamons: (state, action) => {
      state.metamons = action.payload;
    },
  },
});

export const { setMetamons } = metamonMarketSlice.actions;

export const loadMetamonMarket = () => async (dispatch, getState) => {
  const res = await axios(
    "http://lenthiendang.com:6161/api/v1/metamon?sortBy=createdAt&isDesc=true&limit=100&level=5"
  );
  dispatch(setMetamons(res.data.data));
  console.log(res.data.data);
};

// Selectors
export const selectMetamons = createSelector(
  (state) => state.metamon.metamons,
  (metamons) => Object.values(metamons)
);

export default metamonMarketSlice.reducer;
