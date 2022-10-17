import { PayloadAction } from '@reduxjs/toolkit'
import { Inventory, ListResponse, Params, Product } from 'models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import inventoryApi from '../../api/iventoryApi'
import {
  inventoryActions,
  inventoryByBrandActions,
  inventorySearchActions,
  ParamsBrand,
  ParamsSearch,
} from '../slices/inventorySlice'

function* fetchInventoryList(action: PayloadAction<Params>) {
  try {
    const response: ListResponse<Inventory> = yield call(
      inventoryApi.getAll,
      action.payload
    )

    yield put(inventoryActions.fetchInventoryListSuccess(response))
  } catch (error) {
    console.log('Failed to fetch inventory list', error)
    yield put(inventoryActions.fetchInventoryListFailed())
  }
}

function* fetchInventorySearchList(action: PayloadAction<ParamsSearch>) {
  try {
    const response: ListResponse<Product> = yield call(
      inventoryApi.search,
      action.payload.keyword,
      action.payload.params
    )

    yield put(inventorySearchActions.fetchSearchInventoryListSuccess(response))
  } catch (error) {
    console.log('Failed to fetch inventory list', error)
    yield put(inventorySearchActions.fetchSearchInventoryListFailed())
  }
}

function* fetchInventoryListByBrand(action: PayloadAction<ParamsBrand>) {
  try {
    const response: ListResponse<Product> = yield call(
      inventoryApi.getByBrand,
      action.payload.id,
      action.payload.params
    )

    yield put(inventoryByBrandActions.fetchInventoryListByBrandSuccess(response))
  } catch (error) {
    console.log('Failed to fetch inventory list', error)
    yield put(inventoryByBrandActions.fetchInventoryListByBrandFailed())
  }
}
export default function* inventorySaga() {
  yield all([
    takeLatest(inventoryActions.fetchInventoryList.type, fetchInventoryList),
    takeLatest(
      inventorySearchActions.fetchSearchInventoryList.type,
      fetchInventorySearchList
    ),
    takeLatest(
      inventoryByBrandActions.fetchInventoryListByBrand.type,
      fetchInventoryListByBrand
    ),
  ])
}
