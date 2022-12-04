import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import brandReducer from './slices/brandSlice'
import cartReducer, { addToCartReducer } from './slices/cartSlice'
import categoryNavReducer from './slices/categoryNavSlice'
import globalReducer from './slices/globalSlice'
import inventoryReducer, {
  inventoryByBrandReducer,
  inventorySearchReducer,
} from './slices/inventorySlice'
import notificationReducer, {
  deleteNotificationReducer,
  editNotificationReducer,
} from './slices/notificationSlice'
import orderReducer, {
  cancelOrderReducer,
  changeShippingReducer,
  listOrderReducer,
} from './slices/orderSlice'
import productBySubReducer, {
  productDetailReducer,
} from './slices/productBySubSlice'
import productReducer, {
  listProductReducer,
  topProductDiscountReducer,
  topProductReducer,
} from './slices/productSlice'
import provinceReducer from './slices/provinceSlice'
import reviewReducer, { addReviewReducer } from './slices/reviewSlice'
import ShippingReducer, { addShippingReducer } from './slices/shippingSlice'
import userReducer, {
  listAdminReducer,
  loginFacebookReducer,
  registerReducer,
  userProfileReducer,
  userUpdateReducer,
  verifyEmailReducer,
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
  province: provinceReducer,
  inventory: inventoryReducer,
  inventorySearch: inventorySearchReducer,
  inventoryByBrand: inventoryByBrandReducer,
  review: reviewReducer,
  listAdmin: listAdminReducer,
  productBySub: productBySubReducer,
  productDetail: productDetailReducer,
  addReview: addReviewReducer,
  order: orderReducer,
  topProducts: topProductReducer,
  topProductDiscount: topProductDiscountReducer,
  addToCart: addToCartReducer,
  listOrder: listOrderReducer,
  cancelOrder: cancelOrderReducer,
  shipping: ShippingReducer,
  addShipping: addShippingReducer,
  changeShipping: changeShippingReducer,
  allProduct: listProductReducer,
  verifyEmail: verifyEmailReducer,
  register: registerReducer,
  loginFacebook: loginFacebookReducer,
  globalLogin: globalReducer,
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
