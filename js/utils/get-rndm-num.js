import {isIncorrectRange} from './correct-range.js';

const getRandomNumberFromRange = (from, to) => {
  if (isIncorrectRange(from, to)) {
    throw  new RangeError('Диапазон выбран не правильно');
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

getRandomNumberFromRange(0, 10);

export {getRandomNumberFromRange};
