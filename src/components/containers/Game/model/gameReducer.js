import gameStatuses from '../utils/gameStatuses';

export const ACTIONS = {
  START_GAME_REQUEST: 'START_GAME_REQUEST',
  START_GAME: 'START_GAME',
  SELECT_CARD: 'SELECT_CARD',
  SELECT_PAIR: 'SELECT_PAIR',
  SELECTED_PAIR_CORRECT: 'SELECTED_PAIR_CORRECT',
  SELECTED_PAIR_WRONG: 'SELECTED_PAIR_WRONG',
  CHANGE_GAME_STATUS: 'CHANGE_GAME_STATUS',
  SHOW_SPLASHER: 'SHOW_SPLASHER'
};

const defaultState = {
  status: null,
  score: 0,
  maxScore: 0,
  startGameTime: null,
  selectedCards: [],
  userPairsIds: [],
  splasherType: null,
  splasherData: null,
  images: []
};

const game = (state = defaultState, action) => {
  const { payload } = action;

  switch (action.type) {
    case ACTIONS.START_GAME_REQUEST:
      return {
        ...state,
        status: gameStatuses.init
      };

    case ACTIONS.START_GAME:
      return {
        ...state,
        score: 0,
        selectedCards: [],
        status: gameStatuses.intro,
        maxScore: payload.maxScore,
        startGameTime: payload.startGameTime,
        images: payload.images
      };

    case ACTIONS.SELECT_CARD:
      return {
        ...state,
        selectedCards: [
          ...state.selectedCards,
          {
            cardId: payload.cardId,
            pairId: payload.cardPairId
          }
        ]
      };

    case ACTIONS.SELECTED_PAIR_CORRECT:
      return {
        ...state,
        score: state.score + 1,
        selectedCards: [],
        userPairsIds: [...state.userPairsIds, payload.userGuessedPairId]
      };

    case ACTIONS.SELECTED_PAIR_WRONG:
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

export const startGameRequest = () => {
  return {
    type: ACTIONS.START_GAME_REQUEST
  };
};

export const startGame = gameConfig => {
  return {
    type: ACTIONS.START_GAME,
    payload: gameConfig
  };
};

export const selectCard = ({ id, pairId }) => {
  return {
    type: ACTIONS.SELECT_CARD,
    payload: {
      cardId: id,
      cardPairId: pairId
    }
  };
};

export const selectedPairCorrect = userGuessedPairId => {
  return {
    type: ACTIONS.SELECTED_PAIR_CORRECT,
    payload: { userGuessedPairId }
  };
};

export const selectedPairWrong = () => {
  return {
    type: ACTIONS.SELECTED_PAIR_WRONG
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
