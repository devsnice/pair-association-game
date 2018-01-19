import { put, take, select, takeEvery } from 'redux-saga/effects';

import Images from '../resources/imagesConfig';

import {
  ACTIONS,
  selectedPairCorrect,
  selectedPairWrong,
  startGame,
  changeGameStatus,
  showGameSplasher,
  closeGameSplasher
} from './gameReducer';

import { getShuffledImagePairsForGame } from '../utils/gameUtils';
import gameStatuses from '../utils/gameStatuses';

function* gameSaga() {
  yield takeEvery(ACTIONS.START_GAME_REQUEST, function*(action) {
    // todo: check that game hasn't started yet
    const images = getShuffledImagePairsForGame(Images);

    yield put(showGameSplasher('introduction'));
    yield put(
      startGame({
        startGameTime: new Date(),
        maxScore: Images.length,
        images
      })
    );

    // todo:check statuses
    const userPassedIntro = yield take(ACTIONS.CHANGE_GAME_STATUS);

    if (userPassedIntro.payload.status === gameStatuses.playing) {
      yield put(closeGameSplasher());
    }

    yield takeEvery(
      [ACTIONS.SELECT_CARD, ACTIONS.SELECTED_COMBINATION_CORRECT],
      function*(action) {
        const state = yield select();

        if (action.type === ACTIONS.SELECT_CARD) {
          const userSelectPair = state.game.selectedCards.length === 2;

          if (userSelectPair) {
            const firstCardPairId = state.game.selectedCards[0].pairId;
            const secondCardPairId = state.game.selectedCards[1].pairId;

            const isCorrectPair = firstCardPairId === secondCardPairId;

            const isNewPair = !state.game.userPairsIds.includes(
              firstCardPairId
            );

            if (isCorrectPair && firstCardPairId) {
              yield put(selectedPairCorrect(firstCardPairId));
            } else {
              yield put(selectedPairWrong());
            }
          }
        }

        if (action.type === ACTIONS.SELECTED_COMBINATION_CORRECT) {
          const state = yield select();

          if (state.game.score === state.game.maxScore) {
            yield put(changeGameStatus('end'));
            yield put(showGameSplasher('gameEnd'));
          }
        }
      }
    );
  });
}

export default gameSaga;
