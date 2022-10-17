import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import brandReducer from './slices/brandSlice'
import cartReducer from './slices/cartSlice'
import categoryNavReducer from './slices/categoryNavSlice'
import inventoryReducer, {
  inventoryByBrandReducer,
  inventorySearchReducer,
} from './slices/inventorySlice'
import notificationReducer, {
  deleteNotificationReducer,
  editNotificationReducer,
} from './slices/notificationSlice'
import productBySubReducer, {
  productDetailReducer,
} from './slices/productBySubSlice'
import productReducer from './slices/productSlice'
import reviewReducer, { addReviewReducer } from './slices/reviewSlice'
import userReducer, {
  listAdminReducer,
  userProfileReducer,
  userUpdateReducer,
} from './slices/userSlice'

const rootReducer = combineReducers({
  user: userReducer,
  userProfile: userProfileReducer,
  updateProfile: userUpdateReducer,
  brand: brandReducer,
  cart: cartReducer,
  notification: notificationReducer,
  deleteNotification: deleteNotificationReducer,
  editNotification: editNotificationReducer,
  categoryNav: categoryNavReducer,
  product: productReducer,
  inventory: inventoryReducer,
  inventorySearch: inventorySearchReducer,
  inventoryByBrand: inventoryByBrandReducer,
  review: reviewReducer,
  listAdmin: listAdminReducer,
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
