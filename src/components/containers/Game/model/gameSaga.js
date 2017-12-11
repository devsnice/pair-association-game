import { put, fork, take, select, takeEvery } from 'redux-saga/effects';
import {
  ACTIONS,
  selectCombinationSuccess,
  selectCombinationFailure,
  changeGameStatus
} from './gameReducer';

import {
  checkCombination,
  createCombination,
  amountCardsInCombination
} from '../config';

function* gameFlowSaga() {}

function* gameSaga() {
  yield takeEvery(ACTIONS.START_GAME, function*(action) {
    const state = yield select();

    // const userPassedIntroduction = take()
    // check that user passed introduction, after it game begins

    yield takeEvery(
      [ACTIONS.SELECT_CARD, ACTIONS.SELECT_COMBINATION_SUCCESS],
      function*(action) {
        const state = yield select();

        if (action.type === ACTIONS.SELECT_CARD) {
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
        }

        if (action.type === ACTIONS.SELECT_COMBINATION_SUCCESS) {
          if (state.game.score === state.game.maxScore) {
            yield put(changeGameStatus('end'));
          }
        }
      }
    );
  });
}

export default gameSaga;
