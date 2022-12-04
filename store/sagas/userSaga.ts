import { PayloadAction } from '@reduxjs/toolkit'
import { AuthData, AuthResponse, userInfor } from 'models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { setAuthToken, setUserInfo } from 'utils'
import userApi from '../../api/userApi'
import {
  listAdminActions,
  listAdminPayload,
  loginFacebookActions,
  registerActions,
  registerResponse,
  uploadProfilePayload,
  userActions,
  userProfileActions,
  userProfileUpdateAction,
  verifyEmailActions,
  verifyResponse,
  verifyResquest,
} from '../slices/userSlice'

function* login(action: PayloadAction<AuthData>) {
  try {
    const response: AuthResponse = yield call(userApi.login, action.payload)

    yield put(userActions.loginSuccess(response))

    setAuthToken(response.data.token)
    setUserInfo(response.data.user)
  } catch (error) {
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

function* updateProfile(action: PayloadAction<uploadProfilePayload>) {
  try {
    const response: userInfor = yield call(
      userApi.updateProfile,
      action.payload.id,
      action.payload.data
    )

    yield put(userProfileUpdateAction.uploadProfileSuccess(response))
  } catch (error) {
    yield put(userProfileUpdateAction.uploadProfileFaild())
  }
}

function* listAdmin() {
  try {
    const response: listAdminPayload = yield call(userApi.getListAdmin)

    yield put(listAdminActions.getListAdminSuccess(response))
  } catch (error) {
    yield put(listAdminActions.getListAdminFaild)
  }
}

function* verifyEmail(action: PayloadAction<verifyResquest>) {
  try {
    const response: verifyResponse = yield call(userApi.verifyEmail, action.payload)
    yield put(verifyEmailActions.verifyEmailSuccess(response))
  } catch (error) {
    yield put(verifyEmailActions.verifyEmailFaild)
  }
}

function* register(action: PayloadAction<verifyResquest>) {
  try {
    const response: registerResponse = yield call(userApi.register, action.payload)
    yield put(registerActions.registerSuccess(response))
  } catch (error) {
    yield put(registerActions.registerFaild)
  }
}

function* loginFacebook() {
  try {
    const response: registerResponse = yield call(userApi.loginFacebook)
    yield put(loginFacebookActions.loginWithFacebookSuccess())
  } catch (error) {
    yield put(loginFacebookActions.loginWithFacebookFaild)
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userActions.login.type, login),
    takeLatest(userProfileActions.getUserProfile.type, getUserProfile),
    takeLatest(userProfileUpdateAction.uploadProfile.type, updateProfile),
    takeLatest(listAdminActions.getListAdmin.type, listAdmin),
    takeLatest(verifyEmailActions.verifyEmail.type, verifyEmail),
    takeLatest(registerActions.register.type, register),
    takeLatest(loginFacebookActions.loginWithFacebook.type, loginFacebook),
  ])
}
