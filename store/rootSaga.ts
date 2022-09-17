import { all } from 'redux-saga/effects'
import categoryNavSaga from './sagas/categoryNavSaga'
import productSaga from './sagas/productSaga'
import productBySubSaga from './sagas/productBySubSaga'
import brandSaga from './sagas/brandSaga'
import inventorySaga from './sagas/inventorySaga'

export default function* rootSaga() {
  yield all([
    brandSaga(),
    categoryNavSaga(),
    productSaga(),
    inventorySaga(),
    productBySubSaga(),
  ])
}
