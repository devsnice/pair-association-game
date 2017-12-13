import { combinations } from '../config';

const getStringCombination = cards => {
  const sortedCards = cards.sort((a, b) => a - b);

  const combination = sortedCards.reduce(
    (prevValue, currentValue, index) =>
      prevValue ? `${prevValue}, ${currentValue}` : `${currentValue}`,
    ''
  );

  return combination;
};

const getMessageOfCombination = combo => {
  return combinations[combo].msg;
};

const isCorrectCombination = combo => combinations[combo];

export { getStringCombination, getMessageOfCombination, isCorrectCombination };
