export const ACTIONS = {
  START_GAME: 'START_GAME',
  SELECT_CARD: 'SELECT_CARD',
  SELECT_COMBINATION: 'SELECT_COMBINATION',
  SELECT_COMBINATION_SUCCESS: 'SELECT_COMBINATION_SUCCESS',
  SELECT_COMBINATION_FAILURE: 'SELECT_COMBINATION_FAILURE',
  CHANGE_GAME_STATUS: 'CHANGE_GAME_STATUS'
};

const gameStatuses = {
  init: 'init',
  new: 'new',
  end: 'end'
};

const defaultState = {
  status: gameStatuses.init,
  score: 0,
  maxScore: 0,
  startGameTime: null,
  selectedCards: [],
  userCombos: []
};

const game = (state = defaultState, action) => {
  const { payload } = action;

  switch (action.type) {
    case ACTIONS.START_GAME:
      return {
        ...state,
        score: 0,
        maxScore: payload.maxScore,
        startGameTime: payload.startGameTime,
        status: gameStatuses.new
      };

    case ACTIONS.SELECT_CARD:
      return {
        ...state,
        selectedCards: [...state.selectedCards, payload.selectedCardId]
      };

    case ACTIONS.SELECT_COMBINATION_SUCCESS:
      return {
        ...state,
        score: state.score + 1,
        selectedCards: [],
        userCombos: [...state.userCombos, payload.userCombo]
      };

    case ACTIONS.SELECT_COMBINATION_FAILURE:
      return {
        ...state,
        selectedCards: []
      };

    case ACTIONS.CHANGE_GAME_STATUS:
      return {
        ...state,
        status: payload.status
      };

    default:
      return state;
  }
};

export const startGame = gameConfig => {
  return {
    type: ACTIONS.START_GAME,
    payload: gameConfig
  };
};

export const selectCard = id => {
  return {
    type: ACTIONS.SELECT_CARD,
    payload: { selectedCardId: id }
  };
};

export const selectCombinationSuccess = userCombo => {
  return {
    type: ACTIONS.SELECT_COMBINATION_SUCCESS,
    payload: { userCombo }
  };
};

export const selectCombinationFailure = () => {
  return {
    type: ACTIONS.SELECT_COMBINATION_FAILURE
  };
};

export const changeGameStatus = status => {
  if (gameStatuses[status]) {
    return {
      type: ACTIONS.CHANGE_GAME_STATUS,
      payload: {
        status: gameStatuses[status]
      }
    };
  }
};

export default game;
