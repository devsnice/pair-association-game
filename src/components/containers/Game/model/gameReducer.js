export const ACTIONS = {
  START_GAME: 'START_GAME',
  SELECT_CARD: 'SELECT_CARD',
  SELECT_COMBINATION: 'SELECT_COMBINATION',
  SELECTED_COMBINATION_CORRECT: 'SELECTED_COMBINATION_CORRECT',
  SELECTED_COMBINATION_WRONG: 'SELECTED_COMBINATION_WRONG',
  CHANGE_GAME_STATUS: 'CHANGE_GAME_STATUS',
  SHOW_SPLASHER: 'SHOW_SPLASHER'
};

// init -> intro -> playing -> end

export const gameStatuses = {
  init: 'init',
  intro: 'intro',
  playing: 'playing',
  end: 'end'
};

const defaultState = {
  status: gameStatuses.init,
  score: 0,
  maxScore: 0,
  startGameTime: null,
  selectedCards: [],
  userCombos: [],
  splasherType: null,
  splasherData: null
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
        status: gameStatuses.intro
      };

    case ACTIONS.SELECT_CARD:
      return {
        ...state,
        selectedCards: [...state.selectedCards, payload.selectedCardId]
      };

    case ACTIONS.SELECTED_COMBINATION_CORRECT:
      return {
        ...state,
        score: state.score + 1,
        selectedCards: [],
        userCombos: [...state.userCombos, payload.userCombo]
      };

    case ACTIONS.SELECTED_COMBINATION_WRONG:
      return {
        ...state,
        selectedCards: []
      };

    case ACTIONS.CHANGE_GAME_STATUS:
      return {
        ...state,
        status: payload.status
      };

    case ACTIONS.SHOW_SPLASHER:
      return {
        ...state,
        splasherType: payload.type,
        splasherData: payload.data
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

export const selectedCombinationCorrect = userCombo => {
  return {
    type: ACTIONS.SELECTED_COMBINATION_CORRECT,
    payload: { userCombo }
  };
};

export const selectedCombinationWrong = () => {
  return {
    type: ACTIONS.SELECTED_COMBINATION_WRONG
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

export const showGameSplasher = (type, data = {}) => {
  return {
    type: ACTIONS.SHOW_SPLASHER,
    payload: { type, data }
  };
};

export const closeGameSplasher = () => {
  return {
    type: ACTIONS.SHOW_SPLASHER,
    payload: { type: null }
  };
};

export default game;
