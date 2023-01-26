import { createSlice } from '@reduxjs/toolkit';

export const ramFilterParams = createSlice({
  name: 'ramFilterParams',
  initialState: {
    name: '',
    gender: '',
    status: '',
  },
  reducers: {
    changeFilterParams: (state, action) => {
      const { name, gender, status } = action.payload;
      const clearedPayload = {
        ...(name.length > 0 && { name: name }),
        ...(gender.length > 0 && {
          gender: gender,
        }),
        ...(status.length > 0 && {
          status: status,
        }),
      };
      return clearedPayload;
    },
  },
});
export const { changeFilterParams } = ramFilterParams.actions;
export default ramFilterParams.reducer;
