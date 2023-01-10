import { createSlice } from '@reduxjs/toolkit';

export const ramBtnVisibilitySlice = createSlice({
  name: 'optionVisibilityControl',
  initialState: {
    isButtonVisible: false,
    isFilterVisible: false,
  },
  reducers: {
    toggleButtonVisibility: state => {
      state.isButtonVisible = !state.isButtonVisible;
    },
    toggleFilterVisibility: state => {
      state.isFilterVisible = !state.isFilterVisible;
    },
  },
});

export const { toggleButtonVisibility, toggleFilterVisibility } =
  ramBtnVisibilitySlice.actions;

export default ramBtnVisibilitySlice.reducer;
