import { PayloadAction } from '@reduxjs/toolkit'
import { AuthData, AuthResponse, userInfor } from 'models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { setAuthToken, setUserInfo } from 'utils'
import userApi from '../../api/userApi'
import { userActions, userProfileActions } from '../slices/userSlice'

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

function* getUserProfile(action: PayloadAction<String>) {
  try {
    const response: userInfor = yield call(userApi.getUserInfor, action.payload)

    yield put(userProfileActions.getUserProfileSuccess(response))
  } catch (error) {
    yield put(userProfileActions.getUserProfileFaild())
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userActions.login.type, login),
    takeLatest(userProfileActions.getUserProfile.type, getUserProfile),
  ])
}
