import { Order } from '@Models/order'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { removeStoreCartItem } from 'utils'
import orderApi from '../../api/orderApi'
import {
  cancelOrderActions,
  cancelResponse,
  listOrderActions,
  orderActions,
  PaymentData,
  PaymentParams,
} from '../slices/orderSlice'
import { payload } from '../slices/productBySubSlice'

function* payment(action: PayloadAction<PaymentParams>) {
  try {
    const response: PaymentData = yield call(orderApi.payment, action.payload)

    yield put(orderActions.paymentSuccess(response))
    removeStoreCartItem()
  } catch (error) {
    console.log('Payment faild', error)
    yield put(orderActions.paymentFaild())
  }
}

function* listOrder(action: PayloadAction<payload>) {
  try {
    const response: Order = yield call(
      orderApi.listOrder,
      action.payload.id,
      action.payload.params
    )
    yield put(listOrderActions.getlistOrderSuccess(response))
  } catch (error) {
    yield put(listOrderActions.getListOrderFaild())
  }
}

function* cancelOrder(action: PayloadAction<String>) {
  try {
    const response: cancelResponse = yield call(orderApi.cancelOrder, action.payload)
    yield put(cancelOrderActions.cancelOrderSuccess(response))
  } catch (error) {
    yield put(cancelOrderActions.cancelOrderFaild())
  }
}

export default function* brandSaga() {
  yield all([
    takeLatest(orderActions.payment.type, payment),
    takeLatest(listOrderActions.getListOrder.type, listOrder),
    takeLatest(cancelOrderActions.cancelOrder.type, cancelOrder),
  ])
}
