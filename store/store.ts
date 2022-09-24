import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import brandReducer from './slices/brandSlice'
import categoryNavReducer from './slices/categoryNavSlice'
import inventoryReducer from './slices/inventorySlice'
import productBySubReducer, {
  productDetailReducer,
} from './slices/productBySubSlice'
import productReducer from './slices/productSlice'
import reviewReducer, { addReviewReducer } from './slices/reviewSlice'
import userReducer, { userProfileReducer } from './slices/userSlice'

const rootReducer = combineReducers({
  user: userReducer,
  userProfile: userProfileReducer,
  brand: brandReducer,
  categoryNav: categoryNavReducer,
  product: productReducer,
  inventory: inventoryReducer,
  review: reviewReducer,
  productBySub: productBySubReducer,
  productDetail: productDetailReducer,
  addReview: addReviewReducer,
})

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
