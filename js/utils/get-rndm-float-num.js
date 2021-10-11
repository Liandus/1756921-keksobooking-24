import {isIncorrectRange} from './correct-range.js';

const getRandomNumberWithDotFromRange = (from, to, afterDot) => {
  if (isIncorrectRange(from, to)) {
    throw new RangeError('Диапазон выбран не правильно');
  }
  const num = ((from % 1 === 0) || (to % 1 === 0)) ? 1 : 0;
  const number = (Math.random() * (to - from + num)) + from;

  return Number(number.toFixed(afterDot));
};

getRandomNumberWithDotFromRange(10, 30, 5);

export{getRandomNumberWithDotFromRange};
