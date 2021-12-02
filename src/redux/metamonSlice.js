/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

const initialState = {
  metamons: {},
  settings: {
    level: 10,
    score: 300,
    price: 999999999,
    limit: 100,
    sortBy: "createdAt",
    isDesc: true,
  },
  updatedAt: dayjs().format("HH:mm:ss"),
};

export const metamonMarketSlice = createSlice({
  name: "metamonMarket",
  initialState,
  reducers: {
    setMetamons: (state, action) => {
      state.metamons = action.payload;
    },
    setSortBy: (state, action) => {
      state.settings.sortBy = action.payload;
      state.settings.isDesc = action.payload !== "price";
    },
    setFilter: (state, action) => {
      if (action.payload.score) {
        state.settings.score = action.payload.score;
      }
      if (action.payload.price) {
        state.settings.price = action.payload.price;
      }
      if (action.payload.level) {
        state.settings.level = action.payload.level;
      }
    },
    updatedAt: (state) => {
      state.updatedAt = dayjs().format("HH:mm:ss");
    },
  },
});

export const { setMetamons, setSortBy, setFilter, updatedAt } =
  metamonMarketSlice.actions;

export const loadMetamonMarket = () => async (dispatch, getState) => {
  const {
    metamon: { settings },
  } = getState((state) => state);
  const queryString = Object.entries(settings)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

  const res = await axios(
    `http://lenthiendang.com:6161/api/v1/metamon?${queryString}`
  );
  dispatch(setMetamons(res.data.data));
  dispatch(updatedAt());
};

// Selectors
export const selectMetamons = createSelector(
  (state) => state.metamon.metamons,
  (metamons) => Object.values(metamons)
);

export const selectSettings = (state) => state.metamon.settings;
export const selectUpdatedAt = (state) => state.metamon.updatedAt;

export default metamonMarketSlice.reducer;
