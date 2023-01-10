import { configureStore } from '@reduxjs/toolkit';
import ramFilterVisibilityReducer from './ramBtnSlice';
import ramQueryStringReducer from './ramQuerySlice';

export default configureStore({
  reducer: {
    optionVisibilityControl: ramFilterVisibilityReducer,
    ramQueryString: ramQueryStringReducer,
  },
});
