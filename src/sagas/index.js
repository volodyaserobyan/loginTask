import { take, put, call, fork } from 'redux-saga/effects'
import { USERS } from '../const/Const';
import * as actions from '../action/Action'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* login(loginData) {
  try {
    yield delay(2000)
    yield put(actions.setUsers(loginData))
  } catch (error) {
    yield put(actions.setError(error))
  }
}

export function* watchUserLoginRequest() {
  while (true) {
    const { data } = yield take('LOAD')
    yield call(login, data)
  } 
}

function* rootSaga() {
  yield fork(watchUserLoginRequest);
}

export default rootSaga;