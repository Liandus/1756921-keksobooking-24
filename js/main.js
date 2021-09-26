/*
Случайное целое число из диапазона(включая от и до) положительных чисел.
Источник данных:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
const getWrongRange = (numberOne, numberTwo) => {
  if (numberTwo <= numberOne || numberOne < 0 ) {
    throw  new RangeError('Диапазон выбран не правильно');
  }
};

const getRandomNumberFromRange = (from, to) => {
  getWrongRange(from, to);
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from;
};


getRandomNumberFromRange(10, 50);

/*
Случайное целое число c плавающей точкой из диапазона(включая от и до) положительных чисел с указанным кол-ом знаков после запятой.
Источник данных:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
https://learn.javascript.ru/number#netochnye-vychisleniya
https://efim360.ru/javascript-kak-proverit-chislo-na-czeloe
*/

const getRandomNumberWithDotFromRange = (from, to, afterDot) => {
  getWrongRange(from, to);
  let number = (Math.random() * ( to - from)) + from;
  if((from % 1 === 0) || (to % 1 === 0)){
    number = (Math.random() * (to - from + 1)) + from;
  }
  return Number(number.toFixed(afterDot));
};

getRandomNumberWithDotFromRange(1.6, 1.8, 3);
