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

//================================================================================================

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
];

const PHOTO_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const ADVERTISMENT_COUNT = 10;
const AMOUNT_ROOMS_MIN = 1;
const AMOUNT_ROOMS_MAX = 5;
const AMOUNT_OF_GUESTS_MIN = 1;
const AMOUNT_OF_GUESTS_MAX = 10;
const PRICE_MIN = 1000;
const PRICE_MAX = 5000;
const MAXIMUM_USERS = ADVERTISMENT_COUNT;
const AVATAR_PATH = 'img/avatars/user';
const AVATAR_FORMAT = '.png';

let minimumUsers = 0;

const getRandomArrayList = (list) => list.slice([getRandomNumberFromRange(0, list.length - 1)]);

const getRandomArrayElement = (elements) => elements[getRandomNumberFromRange(0, elements.length - 1)];

const getAvatarLink = () => {
  while (minimumUsers < MAXIMUM_USERS) {
    minimumUsers++;
    minimumUsers = (minimumUsers < 10) ? `0${  minimumUsers}` : minimumUsers;
    return `${ AVATAR_PATH }${ minimumUsers }${ AVATAR_FORMAT }`;
  }
};

const getAdvertisement = () =>{

  const FIRST_COORDINATE =  getRandomNumberWithDotFromRange(35.65000, 35.70000, 5);
  const SECOND_COORDINATE =  getRandomNumberWithDotFromRange(139.70000, 139.80000, 5);

  return {

    author: {
      avatar: getAvatarLink(),
    },

    offer: {
      title: 'Объявление',
      address: `${FIRST_COORDINATE }, ${  SECOND_COORDINATE}`,
      price: getRandomNumberFromRange(PRICE_MIN,PRICE_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumberFromRange(AMOUNT_ROOMS_MIN, AMOUNT_ROOMS_MAX),
      guests: getRandomNumberFromRange(AMOUNT_OF_GUESTS_MIN, AMOUNT_OF_GUESTS_MAX),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayList(FEATURES_LIST),
      description: 'Светло, уютно, тепло.',
      photos: getRandomArrayList(PHOTO_LIST),
    },

    location: {
      lat: FIRST_COORDINATE,
      lng: SECOND_COORDINATE,
    },
  };
};

const ADVERTISMENT_LIST = Array.from({length: ADVERTISMENT_COUNT}, getAdvertisement);

console.log(ADVERTISMENT_LIST);
