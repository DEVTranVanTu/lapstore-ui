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

const rootReducer = combineReducers({
  brand:brandReducer,
  categoryNav: categoryNavReducer,
  product: productReducer,
  inventory: inventoryReducer,
  productBySub: productBySubReducer,
  productDetail: productDetailReducer,
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
