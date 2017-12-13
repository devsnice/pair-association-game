const amountCardsInCombination = 2;

const combinations = {
  '1, 2': {
    msg: "You're right!"
  },
  '3, 4': {
    msg: "You're right!"
  }
};

const maxScore = Object.keys(combinations).length;

export { maxScore, combinations, amountCardsInCombination };
