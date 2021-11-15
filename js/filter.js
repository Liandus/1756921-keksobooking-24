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
const RERENDER_DELAY = 700;

const NamePriceValue = {
  LOW_PRICE: 'low',
  MIDDLE_PRICE: 'middle',
  HIGH_PRICE: 'high',
};

const NameRoomsValue = {
  ONE_ROOM: '1',
  TWO_ROOMS: '2',
  THREE_ROOMS: '3',
};

const NameGuestsValue = {
  ONE_GUEST: '1',
  TWO_GUESTS: '2',
  NO_GUESTS: '0',
};

const filterHousingFeature = (data, input) => {
  const filteredData = data.filter((dataEl) => {
    if (input.checked && dataEl.offer.features && dataEl.offer.features.includes(input.value) || !input.checked) {
      return dataEl;
    }
  });
  return filteredData;
};

const getAdvertisementRank = (advertisement) => {
  const advertisementFeatures = advertisement.offer.features;
  let rank = 0;

  const getRank = (feature) => {
    const checkedFeature = feature.checked;
    const featureValue = feature.value;

    if (checkedFeature && advertisementFeatures && advertisementFeatures.includes(featureValue)) {
      return rank += 1;
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

const filterHousingType = (data) => {
  const filteredData = data.filter((dataEl) => dataEl.offer.type === housingTypeEl.value || housingTypeEl.value === 'any');
  return filteredData;
};

const filterHousingPrice = (data) => {
  const filteredData = data.filter((dataEl) => {
    const price = dataEl.offer.price;
    const priceOprtion = housingPriceEl.value;

    switch(priceOprtion) {
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
      default:
        return dataEl;
    }
  });

  return filteredData;
};

const filterHousingRooms = (data) => {
  const filteredData = data.filter((dataEl) => {
    const rooms = dataEl.offer.rooms;
    const roomOprtion = housingRoomsEl.value;

    switch(roomOprtion) {
      case NameRoomsValue.ONE_ROOM:
        if (rooms === Number(NameRoomsValue.ONE_ROOM)) {
          return dataEl;
        }
        break;
      case NameRoomsValue.TWO_ROOMS:
        if (rooms === Number(NameRoomsValue.TWO_ROOMS)) {
          return dataEl;
        }
        break;
      case NameRoomsValue.THREE_ROOMS:
        if (rooms === Number(NameRoomsValue.THREE_ROOMS)) {
          return dataEl;
        }
        break;
      default:
        return dataEl;
    }
  });
  return filteredData;
};

const filterHousingGuests = (data) => {
  const filteredData = data.filter((dataEl) => {
    const guests = dataEl.offer.guests;
    const guestsOprtion = housingGuestsEl.value;

    switch(guestsOprtion) {
      case NameGuestsValue.ONE_GUEST:
        if (guests === Number(NameGuestsValue.ONE_GUEST)) {
          return dataEl;
        }
        break;
      case NameGuestsValue.TWO_GUESTS:
        if (guests === Number(NameGuestsValue.TWO_GUESTS)) {
          return dataEl;
        }
        break;
      case NameGuestsValue.NO_GUESTS:
        if (guests === Number(NameGuestsValue.NO_GUESTS)) {
          return dataEl;
        }
        break;
      default:
        return dataEl;
    }
  });
  return filteredData;
};

const filterHousingOptions = (advertisementsData) => {
  let filterData = advertisementsData;

  filterData = filterHousingType(filterData);
  filterData = filterHousingPrice(filterData);
  filterData = filterHousingRooms(filterData);
  filterData = filterHousingGuests(filterData);
  filterData = filterHousingFeature(filterData, wifiEl);
  filterData = filterHousingFeature(filterData, washerEl);
  filterData = filterHousingFeature(filterData, dishwasherEl);
  filterData = filterHousingFeature(filterData, conditionerEl);
  filterData = filterHousingFeature(filterData, elevatorEl);
  filterData = filterHousingFeature(filterData, parkingEl);

  return filterData;
};

const onFilterChange = (data, adCount, createFunc) => {
  markerGroup.clearLayers();
  const filteredData = filterHousingOptions(data)
    .slice()
    .sort(compareAdvertisiment);

  filteredData
    .slice(0, adCount)
    .forEach((dataEl) => {
      createFunc(dataEl);
    });
};

const debounce = (debouncedFunc, time) => {
  let timeOut;

  return function () {
    const fnCall = () => {
      debouncedFunc.apply(this, arguments);
    };

    clearTimeout(timeOut);

    timeOut = setTimeout(fnCall, time);
  };
};

const callListener = (data, adCount, createFunc) => {
  filterFormEl.addEventListener('change', debounce(() => onFilterChange(data, adCount, createFunc), RERENDER_DELAY));
};

export {callListener};
