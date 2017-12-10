import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import gameSaga from '../components/containers/Game/model/gameSaga';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(gameSaga);

export default store;
