import { configureStore } from '@reduxjs/toolkit'
import listingReducer from './listingReducer'

export default configureStore({
  reducer: {
    clp: listingReducer,
  },
})