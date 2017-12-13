import { put, fork, take, select, takeEvery, cancel } from 'redux-saga/effects';
import {
  ACTIONS,
  selectedCombinationCorrect,
  selectedCombinationWrong,
  changeGameStatus,
  showGameSplasher,
  closeGameSplasher
} from './gameReducer';

import {
  checkCombination,
  createCombination,
  amountCardsInCombination
} from '../config';

function* gameSaga() {
  yield takeEvery(ACTIONS.START_GAME, function*(action) {
    const state = yield select();

    // open introduction
    yield put(showGameSplasher('introduction'));

    // check that user passed introduction, after it game begins
    const userPassedIntro = yield take(ACTIONS.CHANGE_GAME_STATUS);

    if (userPassedIntro.payload.status === 'playing') {
      yield put(closeGameSplasher());
    }

    yield takeEvery(
      [ACTIONS.SELECT_CARD, ACTIONS.SELECTED_COMBINATION_CORRECT],
      function*(action) {
        const state = yield select();

        if (action.type === ACTIONS.SELECT_CARD) {
          const userSelectCombo =
            state.game.selectedCards.length === amountCardsInCombination;

          if (userSelectCombo) {
            const userCombo = createCombination(state.game.selectedCards);

            const isCorrectCombo = checkCombination(userCombo);
            const isNewCombo = !state.game.userCombos.includes(userCombo);

            if (isCorrectCombo && isNewCombo) {
              yield put(showGameSplasher('combinationCorrect'));
              yield put(selectedCombinationCorrect(userCombo));
            } else {
              yield put(showGameSplasher('combinationWrong'));
              yield put(selectedCombinationWrong());
            }
          }
        }

        if (action.type === ACTIONS.SELECTED_COMBINATION_CORRECT) {
          const state = yield select();

          if (state.game.score === state.game.maxScore) {
            yield put(changeGameStatus('end'));
            yield put(showGameSplasher('results'));
          }
        }
      }
    );
  });
}

export default gameSaga;
