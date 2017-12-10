// TODO:: make mechanism for creating combinations

const amountCardsInCombination = 2;

const combinations = {
  '1, 2': {
    msg: "You're right!"
  },
  '5, 10': {
    msg: "You're right!"
  },
  '4, 7': {
    msg: "You're right!"
  },
  '8, 3': {
    msg: "You're right!"
  }
};

const maxScore = Object.keys(combinations).length;

const createCombination = cards => {
  const sortedCards = cards.sort((a, b) => a - b);

  const combination = sortedCards.reduce(
    (prevValue, currentValue, index) =>
      prevValue ? `${prevValue}, ${currentValue}` : `${currentValue}`,
    ''
  );

  return combination;
};

const checkCombination = combo => combinations[combo];

export {
  amountCardsInCombination,
  combinations,
  maxScore,
  checkCombination,
  createCombination
};
