import {getRandomNumberFromRange, getRandomNumberWithDotFromRange} from './random-number-functions.js';

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
const DETERMINATION_ACCURACY = 5;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const AMOUNT_ROOMS_MIN = 1;
const AMOUNT_ROOMS_MAX = 5;
const AMOUNT_OF_GUESTS_MIN = 1;
const AMOUNT_OF_GUESTS_MAX = 10;
const PRICE_MIN = 1000;
const PRICE_MAX = 5000;
const USERS_COUNT_MAX = ADVERTISMENT_COUNT;
const AVATAR_PATH = 'img/avatars/user';
const AVATAR_FORMAT = '.png';
const NUMBER_FOR_RIGHT_USER_LINK_FORMAT = 10;

let createdUsersCount = 0;

const getRandomArrayList = (list) => list.slice([getRandomNumberFromRange(0, list.length - 1)]);

const getRandomArrayElement = (elements) => elements[getRandomNumberFromRange(0, elements.length - 1)];

const getAvatarLink = () => {
  while (createdUsersCount < USERS_COUNT_MAX) {
    createdUsersCount++;
    createdUsersCount = (createdUsersCount < NUMBER_FOR_RIGHT_USER_LINK_FORMAT) ? `0${createdUsersCount}` : createdUsersCount;
    return `${AVATAR_PATH}${createdUsersCount}${AVATAR_FORMAT}`;
  }
};

const getAdvertisement = () => {
  const latitude = getRandomNumberWithDotFromRange(LATITUDE_MIN, LATITUDE_MAX, DETERMINATION_ACCURACY);
  const longitude = getRandomNumberWithDotFromRange(LONGITUDE_MIN, LONGITUDE_MAX, DETERMINATION_ACCURACY);

  return {
    author: {
      avatar: getAvatarLink(),
    },
    offer: {
      title: 'Объявление',
      address: `${latitude}, ${longitude}`,
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
      lat: latitude,
      lng: longitude,
    },
  };
};

const advertismentList = Array.from({length: ADVERTISMENT_COUNT}, getAdvertisement);

export {advertismentList};
