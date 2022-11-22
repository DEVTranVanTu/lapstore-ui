import { cartResponse } from '@Models/cart'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import cartApi from '../../api/cartApi'
import { AddToCart, addToCartActions, cartActions } from '../slices/cartSlice'

function* getCartByUser(action: PayloadAction<string>) {
  try {
    const response: cartResponse = yield call(cartApi.getCart, action.payload)

    yield put(cartActions.getCartByUserSuccess(response))
  } catch (error) {
    yield put(cartActions.getCartByUserFaild())
  }
}

function* addToCart(action: PayloadAction<AddToCart>) {
  try {
    const response: AddToCart = yield call(cartApi.addToCart, action.payload)
    yield put(addToCartActions.addToCartSuccess(response))
  } catch (error) {
    yield put(addToCartActions.addToCartFaild())
  }
}

function* removeCartItem(action: PayloadAction<any>) {
  try {
    yield call(cartApi.removeCartItem, action.payload)
    yield put(cartActions.removeCartItemSuccess())
  } catch (error) {
    yield put(cartActions.removeCartItemFaild())
  }
}

export default function* brandSaga() {
  yield all([
    takeLatest(cartActions.getCartByUser.type, getCartByUser),
    takeLatest(addToCartActions.addToCart.type, addToCart),
    takeLatest(cartActions.removeCartItem.type, removeCartItem),
  ])
}
