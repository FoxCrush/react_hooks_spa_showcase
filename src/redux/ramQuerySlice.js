import { createSlice } from '@reduxjs/toolkit';

export const ramFilterParams = createSlice({
  name: 'ramFilterParams',
  initialState: {
    name: '',
    gender: '',
    status: '',
  },
  reducers: {
    changeFilterParams: (state, action) => action.payload,
  },
});
export const { changeFilterParams } = ramFilterParams.actions;
export default ramFilterParams.reducer;
