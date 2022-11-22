import { call, put, takeLatest } from 'redux-saga/effects'
import provinceApi from '../../api/provinceApi'
import { provinceActions } from '../slices/provinceSlice'

function* fetchProvinceList() {
  try {
    const response: any = yield call(provinceApi.getProvince)
    yield put(provinceActions.fetchProvinceListSuccess(response.data))
  } catch (error) {
    yield put(provinceActions.fetchProvinceListFailed())
  }
}

export default function* provinceSaga() {
  yield takeLatest(provinceActions.fetchProvinceList.type, fetchProvinceList)
}
