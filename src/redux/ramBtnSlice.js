import { createSlice } from '@reduxjs/toolkit';

export const ramBtnVisibilitySlice = createSlice({
  name: 'optionVisibilityControl',
  initialState: {
    isLoading: false,
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleButtonVisibility, toggleFilterVisibility, setLoading } =
  ramBtnVisibilitySlice.actions;

export default ramBtnVisibilitySlice.reducer;
