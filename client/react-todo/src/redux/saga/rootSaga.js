import { all } from 'redux-saga/effects';
import todoSagaWatcher from './todoSaga';

export default function* rootSaga() {
  yield all([
    todoSagaWatcher()
  ])
}
