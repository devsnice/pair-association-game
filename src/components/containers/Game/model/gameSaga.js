import {
  put,
  take,
  select,
  takeEvery,
  cancel,
  call,
  fork
} from 'redux-saga/effects';

import Images from '../resources/imagesConfig';

import {
  ACTIONS,
  selectedPairCorrect,
  selectedPairWrong,
  startGame,
  changeGameStatus,
  showGameSplasher,
  closeGameSplasher,
  gameFinished
} from './gameReducer';

import { getShuffledImagePairsForGame } from '../utils/gameUtils';
import gameStatuses from '../utils/gameStatuses';

/* 
 *  Start game saga describes introduction to game for user
 *  and process of preparing data for game
**/

function* startGameSaga() {
  const state = yield select();

  yield put(showGameSplasher('introduction'));

  const images = yield call(getShuffledImagePairsForGame, Images);

  yield put(
    startGame({
      startGameTime: new Date(),
      maxScore: Images.length,
      images
    })
  );

  const userPassedIntro = yield take(ACTIONS.CHANGE_GAME_STATUS);

  if (userPassedIntro.payload.status === gameStatuses.playing) {
    yield put(closeGameSplasher());
  }
}

/* 
 *  Game is going saga - is a process of interaction of user with game.
 *  User selectes card and and the saga is checking was the combination correct,
 *  and that the game is not finished
**/

function* gameIsGoingSaga() {
  yield takeEvery(
    [ACTIONS.SELECT_CARD, ACTIONS.SELECTED_PAIR_CORRECT],
    function*(action) {
      const state = yield select();

      if (action.type === ACTIONS.SELECT_CARD) {
        const userSelectPair = state.game.selectedCards.length === 2;

        if (userSelectPair) {
          const firstCardPairId = state.game.selectedCards[0].pairId;
          const secondCardPairId = state.game.selectedCards[1].pairId;

          const isCorrectPair = firstCardPairId === secondCardPairId;

          const isNewPair = !state.game.userPairsIds.includes(firstCardPairId);

          if (isCorrectPair && isNewPair) {
            yield put(selectedPairCorrect(firstCardPairId));
          } else {
            yield put(selectedPairWrong());
          }
        }
      }

      if (action.type === ACTIONS.SELECTED_PAIR_CORRECT) {
        const state = yield select();

        if (state.game.score === state.game.maxScore) {
          yield put(gameFinished());
        }
      }
    }
  );
}

/* 
 *  Game Saga - is a flow of the game
**/

function* gameSaga() {
  while (true) {
    const gameIsStarted = yield take(ACTIONS.START_GAME_REQUEST);

    yield startGameSaga();

    const gameIsGoing = yield fork(gameIsGoingSaga);

    yield take(ACTIONS.GAME_FINISHED);

    yield put(showGameSplasher('gameEnd'));
    yield cancel(gameIsGoing);
  }
}

export default gameSaga;
