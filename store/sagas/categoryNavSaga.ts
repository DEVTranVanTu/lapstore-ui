import { CategoryNav } from 'models'
import { call, put, takeLatest } from 'redux-saga/effects'
import categoryApi from '../../api/categoryApi'
import { categoryNavActions } from '../slices/categoryNavSlice'

function* fetchCategoryNavList() {
  try {
    const response: CategoryNav[] = yield call(categoryApi.getAllNav)

    yield put(categoryNavActions.fetchCategoryNavListSuccess(response))
  } catch (error) {
    console.log('Failed to fetch category list', error)
    yield put(categoryNavActions.fetchCategoryNavListFailed())
  }
}

export default function* categoryNavSaga() {
  yield takeLatest(
    categoryNavActions.fetchCategoryNavList.type,
    fetchCategoryNavList
  )
}
