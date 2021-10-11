/*
Случайное целое число из диапазона(включая от и до) положительных чисел.
Источник данных:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
const isIncorrectRange = (min, max) => (max <= min || min < 0);

const getRandomNumberFromRange = (from, to) => {
  if (isIncorrectRange(from, to)) {
    throw  new RangeError('Диапазон выбран не правильно');
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

getRandomNumberFromRange(0, 10);

/*
Случайное целое число c плавающей точкой из диапазона(включая от и до) положительных чисел с указанным кол-ом знаков после запятой.
Источник данных:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
https://learn.javascript.ru/number#netochnye-vychisleniya
https://efim360.ru/javascript-kak-proverit-chislo-na-czeloe
*/

const getRandomNumberWithDotFromRange = (from, to, afterDot) => {
  if (isIncorrectRange(from, to)) {
    throw new RangeError('Диапазон выбран не правильно');
  }
  const num = ((from % 1 === 0) || (to % 1 === 0)) ? 1 : 0;
  const number = (Math.random() * (to - from + num)) + from;

  return Number(number.toFixed(afterDot));
};

getRandomNumberWithDotFromRange(10, 30, 5);

export {getRandomNumberFromRange, getRandomNumberWithDotFromRange};
