import { createSlice } from '@reduxjs/toolkit';

export const ramQueryStringSlice = createSlice({
  name: 'ramQueryString',
  initialState: {
    queryString: '',
  },
  reducers: {
    changeQueryString: (state, action) => {
      state.queryString = action.payload;
    },
  },
});
export const { changeQueryString } = ramQueryStringSlice.actions;
export default ramQueryStringSlice.reducer;
