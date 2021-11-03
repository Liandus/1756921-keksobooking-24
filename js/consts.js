const INITIAL_LAT = 35.71247;
const INITIAL_LNG = 139.78967;
const INITIAL_ZOOM = 12;
const INITIAL_AD_PRICE_VALUE_MIN = 0;
const AD_PRICE_VALUE_MAX = 1000000;
const AD_TITLE_LENGTH_MIN = 30;
const AD_TITLE_LENGTH_MAX = 100;

const PriceHouseTypes = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const QuantityGuestsValue = {
  ONE_GUEST: '1',
  TWO_GUESTS: '2',
  THREE_GUESTS: '3',
  NO_GUESTS: '0',
};

const QuantityRoomsValue = {
  ONE_ROOM: '1',
  TWO_ROOMS: '2',
  THREE_ROOMS: '3',
  HUNDRED_ROOMS: '100',
};

const StateWhenRoomsIsValid = {
  ONE_ROOM_VALIDITY: [QuantityGuestsValue.ONE_GUEST],
  TWO_ROOMS_VALIDITY: [QuantityGuestsValue.ONE_GUEST, QuantityGuestsValue.TWO_GUESTS],
  THREE_ROOMS_VALIDITY: [QuantityGuestsValue.ONE_GUEST, QuantityGuestsValue.TWO_GUESTS, QuantityGuestsValue.THREE_GUESTS],
  HUNDRED_ROOMS_VALIDITY: [QuantityGuestsValue.NO_GUESTS],
};

export {PriceHouseTypes, QuantityRoomsValue, StateWhenRoomsIsValid, INITIAL_LAT, INITIAL_LNG, INITIAL_ZOOM, INITIAL_AD_PRICE_VALUE_MIN,
  AD_PRICE_VALUE_MAX, AD_TITLE_LENGTH_MIN, AD_TITLE_LENGTH_MAX};
