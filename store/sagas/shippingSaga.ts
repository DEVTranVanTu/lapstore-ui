import { Shipping } from '@Models/shipping'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import shippingApi from '../../api/shippingApi'
import {
  addData,
  addShippingActions,
  addShippingResponse,
  shippingActions,
} from '../slices/shippingSlice'

function* fetchShippingList(action: PayloadAction<String>) {
  try {
    const response: Shipping[] = yield call(shippingApi.getByUser, action.payload)

    yield put(shippingActions.fetchShippingListSuccess(response))
  } catch (error) {
    console.log('Failed to fetch category list', error)
    yield put(shippingActions.fetchShippingListFailed())
  }
}

function* addShippingAddress(action: PayloadAction<addData>) {
  try {
    const response: addShippingResponse = yield call(
      shippingApi.addShippingByUser,
      action.payload
    )

    yield put(addShippingActions.addShippingAddressSuccess(response))
  } catch (error) {
    yield put(addShippingActions.addShippingAddressFaild())
  }
}

export default function* shippingSaga() {
  yield all([
    takeLatest(shippingActions.fetchShippingList.type, fetchShippingList),
    takeLatest(addShippingActions.addShippingAddress.type, addShippingAddress),
  ])
}
