import { PayloadAction } from '@reduxjs/toolkit'
import { ListResponse, Params, Product, topProduct } from 'models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import productApi from '../../api/productApi'
import {
  listProductActions,
  topProductActions,
  topProductDiscountActions,
} from '../slices/productSlice'

function* fetchProductList(action: PayloadAction<Params>) {
  try {
    const response: ListResponse<Product> = yield call(
      productApi.getAll,
      action.payload
    )

    yield put(listProductActions.fetchProductListSuccess(response))
  } catch (error) {
    yield put(listProductActions.fetchProductListFailed())
  }
}

function* fetchTopProducts() {
  try {
    const response: topProduct[] = yield call(productApi.getTopProducts)
    yield put(topProductActions.fetchTopProductListSuccess(response))
  } catch (error) {
    yield put(topProductActions.fetchTopProductListFailed())
  }
}

function* fetchTopProductDiscount() {
  try {
    const response: Product[] = yield call(productApi.getTopDiscount)
    yield put(topProductDiscountActions.fetchTopProductDiscountListSuccess(response))
  } catch (error) {
    yield put(topProductDiscountActions.fetchTopProductDiscountListFailed())
  }
}

export default function* productSaga() {
  yield all([
    takeLatest(listProductActions.fetchProductList.type, fetchProductList),
    takeLatest(topProductActions.fetchTopProductList.type, fetchTopProducts),
    takeLatest(
      topProductDiscountActions.fetchTopProductDiscountList.type,
      fetchTopProductDiscount
    ),
  ])
}
