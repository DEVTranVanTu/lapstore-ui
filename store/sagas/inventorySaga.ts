import { PayloadAction } from '@reduxjs/toolkit'
import { Inventory, ListResponse, Params } from 'models'
import { call, put, takeLatest } from 'redux-saga/effects'
import inventoryApi from '../../api/iventoryApi'
import { inventoryActions } from '../slices/inventorySlice'

function* fetchInventoryList(action: PayloadAction<Params>) {
  try {
    const response: ListResponse<Inventory> = yield call(inventoryApi.getAll,action.payload)

    yield put(inventoryActions.fetchInventoryListSuccess(response))
  } catch (error) {
    console.log('Failed to fetch inventory list', error)
    yield put(inventoryActions.fetchInventoryListFailed())
  }
}

export default function* inventorySaga() {
  yield
  takeLatest(inventoryActions.fetchInventoryList.type, fetchInventoryList)
}
