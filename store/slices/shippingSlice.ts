import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Shipping, shippingAddress } from '@Models/shipping'

export interface shippingState {
  loading: boolean
  list: Shipping[]
}

const initialState: shippingState = {
  loading: false,
  list: [],
}

const shippingSlice = createSlice({
  name: 'Shipping',
  initialState,
  reducers: {
    fetchShippingList(state, action: PayloadAction<String>) {
      state.loading = true
    },
    fetchShippingListSuccess(state, action: PayloadAction<Shipping[]>) {
      state.list = action.payload
      state.loading = false
    },
    fetchShippingListFailed(state) {
      state.loading = false
    },
  },
})

// Actions
export const shippingActions = shippingSlice.actions

// Selectors

export const selectShippingList = (state: RootState) => state.shipping.list
export const selectShippingLoading = (state: RootState) => state.shipping.loading
// Reducer
const ShippingReducer = shippingSlice.reducer
export default ShippingReducer

export interface addShippingResponse {
  success: Boolean
  message: String
}

export interface addShippingState {
  loading: boolean
  data: addShippingResponse
}

export interface addData {
  userId: string
  shipping: shippingAddress
}

export const initialAddShippingState: addShippingState = {
  loading: false,
  data: {
    success: false,
    message: '',
  },
}

const addShippingSlice = createSlice({
  name: 'Add Shipping',
  initialState: initialAddShippingState,
  reducers: {
    addShippingAddress(state, action: PayloadAction<addData>) {
      state.loading = true
    },
    addShippingAddressSuccess(state, action: PayloadAction<addShippingResponse>) {
      ;(state.loading = false), (state.data = action.payload)
    },
    addShippingAddressFaild(state) {
      state.loading = false
    },
  },
})

// Actions
export const addShippingActions = addShippingSlice.actions

// Selectors

export const addShippingData = (state: RootState) => state.addShipping.data
export const addShippingLoading = (state: RootState) => state.addShipping.loading
// Reducer
export const addShippingReducer = addShippingSlice.reducer
