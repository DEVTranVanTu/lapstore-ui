import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { removeCartItem } from 'utils'
import orderApi from '../../api/orderApi'
import { orderActions, PaymentData, PaymentParams } from '../slices/orderSlice'

function* payment(action: PayloadAction<PaymentParams>) {
  try {
    const response: PaymentData = yield call(orderApi.payment, action.payload)

    yield put(orderActions.paymentSuccess(response))
    removeCartItem()
  } catch (error) {
    console.log('Payment faild', error)
    yield put(orderActions.paymentFaild())
  }
}

export default function* brandSaga() {
  yield all([takeLatest(orderActions.payment.type, payment)])
}
