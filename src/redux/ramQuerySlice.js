import { createSlice } from '@reduxjs/toolkit';

export const ramFilterParams = createSlice({
  name: 'ramFilterParams',
  initialState: {
    changeFilterParams: {},
    ramPage: 1,
  },
  reducers: {
    changeFilterParams: (state, action) => {
      const { name, gender, status } = action.payload;
      const clearedPayload = {
        ...(name?.length > 0 && { name: name }),
        ...(gender?.length > 0 && {
          gender: gender,
        }),
        ...(status?.length > 0 && {
          status: status,
        }),
      };
      return clearedPayload;
    },
    ramPage: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { changeFilterParams } = ramFilterParams.actions;
export default ramFilterParams.reducer;
