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

//const avatarNumber = getRandomNumberFromRange(1, 10);
const  avatarNumbers = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];

const advertisementCount = 10;

const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const times = [
  '12:00',
  '13:00',
  '14:00',
];
const featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
];


const photoList = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];


const getRandomArrayList = (list) => list.slice([getRandomNumberFromRange(0, list.length - 1)]);

const getRandomArrayElement = (elements) => elements[getRandomNumberFromRange(0, elements.length - 1)];


const removeElement =(arr, value) => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const getAndDelElement = (array) => {
  let element;
  if (array.length > 2) {
    element = getRandomArrayElement(array);
  } else {
    element = array.shift();
  }
  removeElement(array, element);

  return element;
};


const advertisement = () => ({
  author: {
    avatar: `img/avatars/user${ getAndDelElement(avatarNumbers) }.png`,
    /*avatar: `img/avatars/user${  avatarNumber < 10 ? '0' : ''  }${avatarNumber  }.png`,*/
  },

  offer: {
    title: 'Объявление',
    address: `${location.lat  }, ${  location.lng}`,
    price:getRandomNumberFromRange(1000, 5000),
    type: getRandomArrayElement(types),
    rooms: getRandomNumberFromRange(1, 5),
    guests: getRandomNumberFromRange(1, 10),
    checkin: getRandomArrayElement(times),
    checkout: getRandomArrayElement(times),
    features: getRandomArrayList(featuresList),
    description:'Светло, уютно, тепло.',
    photos: getRandomArrayList(photoList),
  },

  location: {
    lat: getRandomNumberWithDotFromRange(35.65000, 35.70000, 5),
    lng: getRandomNumberWithDotFromRange(139.70000, 139.80000, 5),
  },
});
const advertisementList = Array.from({length: advertisementCount}, advertisement);

advertisementList();
