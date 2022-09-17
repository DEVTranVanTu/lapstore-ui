import { Brand } from 'models'
import { call, put, takeLatest } from 'redux-saga/effects'
import brandApi from '../../api/brandApi'
import { brandActions } from '../slices/brandSlice'

function* fetchBrandList() {
  try {
    const response: Brand[] = yield call(brandApi.getAll)

    yield put(brandActions.fetchBrandListSuccess(response))
  } catch (error) {
    console.log('Failed to fetch category list', error)
    yield put(brandActions.fetchBrandListFailed())
  }
}

export default function* brandSaga() {
  yield takeLatest(
    brandActions.fetchBrandList.type,
    fetchBrandList
  )
}
