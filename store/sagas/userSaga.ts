import { PayloadAction } from '@reduxjs/toolkit'
import { AuthData, AuthResponse } from 'models'
import { call, put, takeLatest } from 'redux-saga/effects'
import { setAuthToken, setUserInfo } from 'utils'
import userApi from '../../api/userApi'
import { userActions } from '../slices/userSlice'

function* login(action: PayloadAction<AuthData>) {
  try {
    const response: AuthResponse = yield call(userApi.login, action.payload)

    yield put(userActions.loginSuccess(response))

    setAuthToken(response.data.token)
    setUserInfo(response.data.user)
  } catch (error) {
    console.log('Failed to login', error)
    yield put(userActions.loginFailed())
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.login.type, login)
}
