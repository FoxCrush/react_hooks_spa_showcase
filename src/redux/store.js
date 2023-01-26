import { configureStore } from '@reduxjs/toolkit';
import ramFilterVisibilityReducer from './ramBtnSlice';
import ramFilterParamsReducer from './ramQuerySlice';

export default configureStore({
  reducer: {
    optionVisibilityControl: ramFilterVisibilityReducer,
    ramFilterParams: ramFilterParamsReducer,
  },
});
