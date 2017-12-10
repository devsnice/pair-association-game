import { put, select, takeEvery } from 'redux-saga/effects';
import {
  ACTIONS,
  selectCombinationSuccess,
  selectCombinationFailure
} from './gameReducer';

import {
  checkCombination,
  createCombination,
  amountCardsInCombination
} from '../config';

function* gameSaga() {
  yield takeEvery(ACTIONS.START_GAME, function*(action) {
    const state = yield select();

    yield takeEvery(ACTIONS.SELECT_CARD, function*(action) {
      const state = yield select();

      if (state.game.selectedCards.length === amountCardsInCombination) {
        const userCombo = createCombination(state.game.selectedCards);

        const isCorrectCombo = checkCombination(userCombo);
        const isNewCombo = !state.game.userCombos.includes(userCombo);

        if (isCorrectCombo && isNewCombo) {
          yield put(selectCombinationSuccess(userCombo));
        } else {
          yield put(selectCombinationFailure());
        }
      }
    });
  });
}

export default gameSaga;
