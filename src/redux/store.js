import { configureStore } from '@reduxjs/toolkit'
import ramFilterVisibilityReducer from './ramReducer'

export default configureStore({
  reducer: {
    optionVisibilityControl:ramFilterVisibilityReducer
  },
})