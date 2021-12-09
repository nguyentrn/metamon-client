/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";
import categories from "../constant/categories";

const formatItem = (item, name) => {
  const result = {};
  result.marketId = item.id;
  result.id = item.token_id;
  result.count = item.count;
  result.totalPrice = parseInt(item.fixed_price, 10);
  result.price = result.totalPrice / result.count;
  result.img = item.image_url;
  result.name = name;

  return result;
};

const initialState = {
  items: [],
  metamons: {},
  metamonSettings: {
    level: 10,
    score: 300,
    price: 999999999,
    limit: 100,
    sortBy: "createdAt",
    isDesc: true,
  },
  settings: {
    pageNo: 1,
    pageSize: 100,
    sortBy: "single_price",
    order: "asc",
  },
  lastId: undefined,
  updatedAt: dayjs().format("HH:mm:ss"),
};

export const othersMarketSlice = createSlice({
  name: "othersMarket",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSortBy: (state, action) => {
      switch (action.payload) {
        case "createdAt":
          state.settings.sortBy = "created_at";
          break;
        default:
          state.settings.sortBy = "single_price";
          break;
      }
      state.settings.order = action.payload !== "price" ? "desc" : "asc";
    },
    setFilter: (state, action) => {
      if (action.payload.price) {
        state.settings.price = action.payload.price;
      }
    },
    setMetamons: (state, action) => {
      state.metamons = action.payload;
    },
    setMetamonSortBy: (state, action) => {
      state.metamonSettings.sortBy = action.payload;
      state.metamonSettings.isDesc = action.payload !== "price";
    },
    setMetamonFilter: (state, action) => {
      if (action.payload.score) {
        state.metamonSettings.score = action.payload.score;
      }
      if (action.payload.price) {
        state.metamonSettings.price = action.payload.price;
      }
      if (action.payload.level) {
        state.metamonSettings.level = action.payload.level;
      }
    },
    setLastId: (state, action) => {
      state.lastId = action.payload;
    },
    updatedAt: (state) => {
      state.updatedAt = dayjs().format("HH:mm:ss");
    },
  },
});

export const {
  setItems,
  setMetamons,
  setMetamonSortBy,
  setMetamonFilter,
  setSortBy,
  setFilter,
  setLastId,
  updatedAt,
} = othersMarketSlice.actions;

export const loadOthersMarket = () => async (dispatch, getState) => {
  const {
    others: { settings },
    nav: { selectedCategory },
  } = getState((state) => state);

  const category = categories.find((cate) => selectedCategory === cate.slug);
  const queryString = `${Object.entries(settings)
    .map(([key, val]) => `${key}=${val}`)
    .join("&")}&category=${category.id}&tokenId=${category.tokenId}`;
  const res = await axios(
    `https://market-api.radiocaca.com/nft-sales?${queryString}`
  );
  console.log(category.id);
  const data = res.data.list.map((item) => formatItem(item, category.name));
  // console.log(data);

  dispatch(setItems(data));

  if (res.data.list.length) {
    dispatch(setLastId(res.data.list[0].marketId));
  }
  dispatch(updatedAt());
};

export const loadMetamonMarket = () => async (dispatch, getState) => {
  const {
    others: { metamonSettings },
  } = getState((state) => state);
  const queryString = Object.entries(metamonSettings)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

  const res = await axios(
    `http://lenthiendang.com:6161/api/v1/metamon?${queryString}`
  );
  dispatch(setMetamons(res.data.data));
  if (res.data.data.length) {
    dispatch(setLastId(res.data.data[0].id));
  }
  dispatch(updatedAt());
};

// Selectors
export const selectOthers = (state) => state.others.items;
export const selectMetamons = createSelector(
  (state) => state.others.metamons,
  (metamons) => Object.values(metamons)
);

export const selectMetamonSettings = (state) => state.others.metamonSettings;
export const selectSettings = (state) => state.others.settings;
export const selectUpdatedAt = (state) => state.others.updatedAt;
export const selectLastId = (state) => state.others.lastId;

export default othersMarketSlice.reducer;
