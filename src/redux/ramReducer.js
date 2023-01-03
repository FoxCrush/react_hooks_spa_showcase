import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'optionButtonVisibility',
  initialState: {
    isVisible: false,
  },
  reducers: {
    toggleOptionButton: (state) => {
      state.isVisible = !state.isVisible
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleOptionButton } = counterSlice.actions

export default counterSlice.reducer