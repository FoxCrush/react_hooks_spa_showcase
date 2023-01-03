import { configureStore } from '@reduxjs/toolkit'
import ramOptionButtonReducer from './ramReducer'

export default configureStore({
  reducer: {
    optionButtonVisibility:ramOptionButtonReducer
  },
})