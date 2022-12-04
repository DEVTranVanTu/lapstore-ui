import { put, takeLatest } from 'redux-saga/effects'
import { globalActions } from '../slices/globalSlice'

function* changeLogin() {
  try {
    yield put(globalActions.changeLoginSuccess())
  } catch (error) {
    yield put(globalActions.changeLoginFailed)
  }
}

export default function* brandSaga() {
  yield takeLatest(globalActions.changeLogin.type, changeLogin)
}
