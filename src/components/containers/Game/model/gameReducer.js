export const ACTIONS = {};

const defaultState = {
  status: 'new'
};

const game = (state = defaultState, action) => {
  const { payload } = action;

  switch (action.type) {
    default:
      return state;
  }
};

export default game;
