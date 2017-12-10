import { combineReducers } from 'redux';

import gameReducer from '../components/containers/Game/model/gameReducer';

const reducer = combineReducers({ game: gameReducer });

export default reducer;
