import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ResponseAddReview, Review } from 'models'

// list review

export interface ReviewState {
  loading: boolean
  list: Review[]
}

const initialState: ReviewState = {
  loading: false,
  list: [],
}

const reviewSlice = createSlice({
  name: 'Review',
  initialState,
  reducers: {
    fetchReviewList(state, action: PayloadAction<string>) {
      state.loading = true
    },
    fetchReviewListSuccess(state, action: PayloadAction<Review[]>) {
      state.list = action.payload
      state.loading = false
    },
    fetchReviewListFailed(state) {
      state.loading = false
    },
  },
})

// add review

export interface addReviewState {
  loading: boolean
  data: ResponseAddReview
}

const initialAddReviewState: addReviewState = {
  loading: false,
  data: {
    success: false,
    message: '',
    data: {
      userName: '',
      userAvatar: '',
      userId: '',
      product: '',
      review: '',
      rating: 0,
    },
  },
}

const addReviewSlice = createSlice({
  name: 'addReview',
  initialState: initialAddReviewState,
  reducers: {
    addReview(state, action: PayloadAction<Review>) {
      state.loading = true
    },
    addReviewSuccess(state, action: PayloadAction<ResponseAddReview>) {
      state.data = action.payload
      state.loading = false
    },
    addReviewFailed(state) {
      state.loading = false
    },
  },
})
// Actions
export const reviewActions = reviewSlice.actions
export const addReviewActions = addReviewSlice.actions
// Selectors

export const selectReviewList = (state: RootState) => state.review.list
export const selectReviewLoading = (state: RootState) => state.review.loading

export const addReviewData = (state: RootState) => state.addReview.data
export const addReviewLoading = (state: RootState) => state.addReview.loading

// Reducer
const reviewReducer = reviewSlice.reducer
export default reviewReducer

export const addReviewReducer = addReviewSlice.reducer
