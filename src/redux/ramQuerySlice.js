import { createSlice } from '@reduxjs/toolkit';

export const ramQueryStringSlice = createSlice({
  name: 'ramQueryString',
  initialState: {
    queryString: '/character/',
  },
  reducers: {
    changeQueryString: (state, action) => {
      state.ramRequestQueryString = action.payload;
    },
  },
});
export const { changeQueryString } = ramQueryStringSlice.actions;
export default ramQueryStringSlice.reducer;
