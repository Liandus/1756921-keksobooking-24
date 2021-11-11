import {markerGroup} from './map.js';
const housingTypeEl = document.querySelector('#housing-type');
const housingPriceEl = document.querySelector('#housing-price');
const housingRoomsEl = document.querySelector('#housing-rooms');
const housingGuestsEl = document.querySelector('#housing-guests');
const filterFormEl = document.querySelector('.map__filters');
const wifiEl = document.querySelector('#filter-wifi');
const dishwasherEl = document.querySelector('#filter-dishwasher');
const parkingEl = document.querySelector('#filter-parking');
const washerEl = document.querySelector('#filter-washer');
const elevatorEl = document.querySelector('#filter-elevator');
const conditionerEl = document.querySelector('#filter-conditioner');
const LOW_PRICE_BORDER = 10000;
const HIGH_PRICE_BORDER = 50000;
const ONE_ROOM = 1;
const TWO_ROOMS = 2;
const THREE_ROOMS = 3;
const ONE_GUEST = 1;
const TWO_GUESTS = 2;
const ZERO_GUESTS = 0;

const NamePriceValue = {
  ANY_PRICE: 'any',
  LOW_PRICE: 'low',
  MIDDLE_PRICE: 'middle',
  HIGH_PRICE: 'high',
};

const NameRoomsValue = {
  ANY_ROOMS: 'any',
  ONE_ROOM: '1',
  TWO_ROOMS: '2',
  THREE_ROOMS: '3',
};

const NameGuestsValue = {
  ANY_GUESTS: 'any',
  ONE_GUEST: '1',
  TWO_GUESTS: '2',
  NO_GUESTS: '0',
};

const getAdvertisementRank = (advertisement) => {
  const advertisementFeatures = advertisement.offer.features;
  let rank = 0;

  const getRank = (feature) => {
    if (feature.checked) {
      if (advertisementFeatures && advertisementFeatures.includes(feature.value)) {
        return rank += 1;
      }
    }
    return rank;
  };

  getRank(wifiEl);

  getRank(dishwasherEl);

  getRank(parkingEl);

  getRank(washerEl);

  getRank(elevatorEl);

  getRank(conditionerEl);

  return rank;
};

const compareAdvertisiment = (advertisimentA, advertisimentB) => {
  const rankA = getAdvertisementRank(advertisimentA);
  const rankB = getAdvertisementRank(advertisimentB);

  return rankB - rankA;
};

const housingTypeFilter = (dataEl) => dataEl.offer.type === housingTypeEl.value || housingTypeEl.value === 'any';

const housingPriceFilter = (dataEl) => {
  const price = dataEl.offer.price;
  const priceOprtion = housingPriceEl.value;

  switch(priceOprtion) {
    case NamePriceValue.ANY_PRICE:
      return dataEl;
    case NamePriceValue.LOW_PRICE:
      if (Number(price) < LOW_PRICE_BORDER) {
        return dataEl;
      }
      break;
    case NamePriceValue.MIDDLE_PRICE:
      if (Number(price) >= LOW_PRICE_BORDER && Number(price) < HIGH_PRICE_BORDER) {
        return dataEl;
      }
      break;
    case NamePriceValue.HIGH_PRICE:
      if (Number(price) > HIGH_PRICE_BORDER) {
        return dataEl;
      }
      break;
  }
};

const housingRoomsFilter = (dataEl) => {
  const rooms = dataEl.offer.rooms;
  const roomOprtion = housingRoomsEl.value;

  switch(roomOprtion) {
    case NameRoomsValue.ANY_ROOMS:
      return dataEl;
    case NameRoomsValue.ONE_ROOM:
      if (Number(rooms) === ONE_ROOM) {
        return dataEl;
      }
      break;
    case NameRoomsValue.TWO_ROOMS:
      if (Number(rooms) === TWO_ROOMS) {
        return dataEl;
      }
      break;
    case NameRoomsValue.THREE_ROOMS:
      if (Number(rooms) === THREE_ROOMS) {
        return dataEl;
      }
      break;
  }
};

const housingGuestsFilter = (dataEl) => {
  const guests = dataEl.offer.guests;
  const guestsOprtion = housingGuestsEl.value;

  switch(guestsOprtion) {
    case NameGuestsValue.ANY_GUESTS:
      return dataEl;
    case NameGuestsValue.ONE_GUEST:
      if (Number(guests) === ONE_GUEST) {
        return dataEl;
      }
      break;
    case NameGuestsValue.TWO_GUESTS:
      if (Number(guests) === TWO_GUESTS) {
        return dataEl;
      }
      break;
    case NameGuestsValue.NO_GUESTS:
      if (Number(guests) === ZERO_GUESTS) {
        return dataEl;
      }
      break;
  }
};

const onFilterChange = (data, adCount, createFunc) => {
  markerGroup.clearLayers();
  const filter = data
    .filter((dataEl) => housingTypeFilter(dataEl))
    .filter((dataEl) => housingPriceFilter(dataEl))
    .filter((dataEl) => housingRoomsFilter(dataEl))
    .filter((dataEl) => housingGuestsFilter(dataEl))
    .slice()
    .sort(compareAdvertisiment);

  filter
    .slice(0, adCount)
    .forEach((dataEl) => {
      createFunc(dataEl);
    });
};

//TODO придумать название
const callListener = (data, adCount, createFunc) => {
  filterFormEl.addEventListener('change', () => onFilterChange(data, adCount, createFunc));
};

export {callListener};
