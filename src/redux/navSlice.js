/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "metamon",
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory } = navSlice.actions;

// export const loadMetamonnav = () => async (dispatch) => {
// };

// Selectors
export const selectSelectedCategory = (state) => state.nav.selectedCategory;

export default navSlice.reducer;
