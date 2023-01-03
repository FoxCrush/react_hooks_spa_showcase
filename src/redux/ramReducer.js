import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'optionVisibilityControl',
  initialState: {
    isButtonVisible: false,
    isFilterVisible: false
  },
  reducers: {
    toggleButtonVisibility: (state) => {
      state.isButtonVisible = !state.isButtonVisible
    },
    toggleFilterVisibility: (state) => {
        state.isFilterVisible = !state.isFilterVisible
      }
  },
})

// Action creators are generated for each case reducer function
export const { toggleButtonVisibility, toggleFilterVisibility } = counterSlice.actions

export default counterSlice.reducer