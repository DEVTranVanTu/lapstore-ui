import { call, put, takeLatest } from 'redux-saga/effects'
import provinceApi from '../../api/provinceApi'
import { provinceActions } from '../slices/provinceSlice'

export interface dataResponse {
  data: []
}
function* fetchProvinceList() {
  try {
    const response: dataResponse = yield call(provinceApi.getProvince)

    yield put(provinceActions.fetchProvinceListSuccess(response.data))
  } catch (error) {
    yield put(provinceActions.fetchProvinceListFailed())
  }
}

export default function* provinceSaga() {
  yield takeLatest(provinceActions.fetchProvinceList.type, fetchProvinceList)
}
