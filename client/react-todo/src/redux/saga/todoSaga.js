import { call, put, takeEvery, takeLatest, debounce, throttle } from 'redux-saga/effects';
import { changeStatus } from '../actionCreators/todosAC';
import { CHANGE_STATUS_SAGA } from '../types/todoTypes';

const changeStatusServerSaga = (id) => {

  return fetch('http://localhost:3000/api/v1/todos', {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
    .then(response => response.json())
}

function* todoSagaWorker(action) {
  try {
    const newTodo = yield call(changeStatusServerSaga, action.payload);
    yield put(changeStatus(newTodo.id));
  } catch (e) {
    console.log(e)
  }
}

function* todoSagaWatcher() {
  yield takeLatest(CHANGE_STATUS_SAGA, todoSagaWorker);

}
export default todoSagaWatcher
