import { Product, topProduct } from 'models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import productApi from '../../api/productApi'
import {
  productActions,
  topProductActions,
  topProductDiscountActions,
} from '../slices/productSlice'

function* fetchProductList() {
  try {
    const response: Product[] = yield call(productApi.getAll)

    yield put(productActions.fetchProductListSuccess(response))
  } catch (error) {
    console.log('Failed to fetch product list', error)
    yield put(productActions.fetchProductListFailed())
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
    takeLatest(productActions.fetchProductList.type, fetchProductList),
    takeLatest(topProductActions.fetchTopProductList.type, fetchTopProducts),
    takeLatest(
      topProductDiscountActions.fetchTopProductDiscountList.type,
      fetchTopProductDiscount
    ),
  ])
}
