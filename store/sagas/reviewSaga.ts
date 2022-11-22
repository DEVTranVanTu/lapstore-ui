import { PayloadAction } from '@reduxjs/toolkit'
import { ResponseAddReview, Review } from 'models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import reviewApi from '../../api/reviewApi'
import { addReviewActions, reviewActions } from '../slices/reviewSlice'

function* fetchReviewList(action: PayloadAction<string>) {
  try {
    const response: Review[] = yield call(
      reviewApi.getReviewByProductId,
      action.payload
    )

    yield put(reviewActions.fetchReviewListSuccess(response))
  } catch (error) {
    yield put(reviewActions.fetchReviewListFailed())
  }
}

function* addReview(action: PayloadAction<Review>) {
  try {
    const response: ResponseAddReview = yield call(
      reviewApi.addReview,
      action.payload
    )
    yield put(addReviewActions.addReviewSuccess(response))
  } catch (error) {
    yield put(addReviewActions.addReviewFailed())
  }
}

export default function* reviewSaga() {
  yield all([
    takeLatest(reviewActions.fetchReviewList.type, fetchReviewList),
    takeLatest(addReviewActions.addReview.type, addReview),
  ])
}
