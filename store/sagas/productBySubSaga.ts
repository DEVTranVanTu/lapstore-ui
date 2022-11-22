import { ListResponse } from '@Models/common'
import { Product } from '@Models/product'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import productApi from '../../api/productApi'
import {
  payload,
  productBySubActions,
  productDetailActions,
} from '../slices/productBySubSlice'

function* fetchProductListBySub(action: PayloadAction<payload>) {
  try {
    const response: ListResponse<Product> = yield call(
      productApi.getAllSub,
      action.payload.id,
      action.payload.params
    )

    yield put(productBySubActions.fetchProductListBySubSuccess(response))
  } catch (error) {
    yield put(productBySubActions.fetchProductListBySubFailed())
  }
}

function* fetchProductDetail(action: PayloadAction<string>) {
  try {
    const response: Product = yield call(productApi.getById, action.payload)
    yield put(productDetailActions.fetchProductDetailSuccess(response))
  } catch (error) {
    yield put(productDetailActions.fetchProductDetailFailed())
  }
}
export default function* productSaga() {
  yield all([
    takeLatest(
      productBySubActions.fetchProductListBySub.type,
      fetchProductListBySub
    ),
    takeLatest(productDetailActions.fetchProductDetail.type, fetchProductDetail),
  ])
}
