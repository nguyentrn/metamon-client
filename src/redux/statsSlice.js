/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { sortWith, descend, prop } from "ramda";
import categories from "../constant/categories";
import metamonCategories from "../constant/metamonCategories";

const byCount = sortWith([descend(prop("count"))]);

const initialState = {
  commonStats: [],
  metamonStats: [],
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setCommonStats: (state, action) => {
      state.commonStats = action.payload;
    },
    setMetamonStats: (state, action) => {
      state.metamonStats = action.payload;
    },
  },
});

export const { setCommonStats, setMetamonStats } = statsSlice.actions;

const getStats = async (categories) => {
  const res = await Promise.all(
    categories.map(async (cate) => {
      const res = await axios(
        `https://market-api.radiocaca.com/nft-sales?pageNo=1&pageSize=1&sortBy=single_price&order=asc&category=${cate.id}&tokenId=${cate.tokenId}`
      );

      return {
        count: res.data.total,
        price: res.data.list.length
          ? (res.data.list[0].fixed_price * 1) / res.data.list[0].count
          : null,
        id: cate.id,
        name: cate.name,
        slug: cate.slug,
      };
    })
  );
  return byCount(res.filter((data) => data.price));
};

export const loadCommonStats = () => async (dispatch) => {
  const commonStats = await getStats(categories);
  dispatch(setCommonStats(commonStats));
};

export const loadMetamonStats = () => async (dispatch) => {
  const metamonStats = await getStats(metamonCategories);
  dispatch(setMetamonStats(metamonStats));
};

// Selectors
export const selectCommonStats = (state) => state.stats.commonStats;
export const selectMetamonStats = (state) => state.stats.metamonStats;

export default statsSlice.reducer;
