import {deleteAttribute} from './utils/del-attribute.js';
import {toSetAttribute} from './utils/get-attribute.js';
import {isEscapeKey} from './utils/is-escape.js';

const form = document.querySelector('.ad-form');
const userAdTitle = form.querySelector('#title');
const userPrice = form.querySelector('#price');
const quantityRooms = form.querySelector('#room_number');
const quantityGuests = form.querySelector('#capacity');
const typeHouse = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const succesPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const AD_PRICE_VALUE_MIN = userPrice.min;
const AD_PRICE_VALUE_MAX = 1000000;
const AD_TITLE_LENGTH_MIN = 30;
const AD_TITLE_LENGTH_MAX = 100;
const PRICE_HOUSE_TYPES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const checkTitleValidity = () => {
  const valueLength = userAdTitle.value.length;

  if (valueLength < AD_TITLE_LENGTH_MIN) {
    userAdTitle.setCustomValidity(`Заголовок слишком короткий, пожалуйста, введите еще ${AD_TITLE_LENGTH_MIN - valueLength} символа.`);
  } else if (valueLength > AD_TITLE_LENGTH_MAX) {
    userAdTitle.setCustomValidity(`Заголовок слишком длиный, пожалуйста, удалите ${valueLength - AD_TITLE_LENGTH_MAX} символа.`);
  } else {
    userAdTitle.setCustomValidity('');
  }
};

const checkPriceValidity = () => {
  const priceValue = userPrice.value;

  if (priceValue < AD_PRICE_VALUE_MIN) {
    userPrice.setCustomValidity(`Вы ввели неверное значение. Цена начинается от ${AD_PRICE_VALUE_MIN} руб.`);
  } else if (priceValue > AD_PRICE_VALUE_MAX) {
    userPrice.setCustomValidity(`Вы превысили максимальное значение равное ${AD_PRICE_VALUE_MAX} руб.`);
  } else {
    userPrice.setCustomValidity('');
  }
};

const checkRoomToGuestValue = () => {
  const roomsOption = quantityRooms.options[quantityRooms.selectedIndex].value;

  for (let i = 0; i < quantityGuests.length; i++) {
    toSetAttribute(quantityGuests.options[i], 'disabled', '');
    switch(roomsOption) {
      case '1':
        deleteAttribute(quantityGuests.options[2], 'disabled');
        break;
      case '2':
        deleteAttribute(quantityGuests.options[1], 'disabled');
        deleteAttribute(quantityGuests.options[2], 'disabled');
        break;
      case '3':
        deleteAttribute(quantityGuests.options[0], 'disabled');
        deleteAttribute(quantityGuests.options[1], 'disabled');
        deleteAttribute(quantityGuests.options[2], 'disabled');
        break;
      case '100':
        deleteAttribute(quantityGuests.options[3], 'disabled');
        break;
    }
  }
};

const checkGuestToRoomValue = () => {
  const guestOption = quantityGuests.options[quantityGuests.selectedIndex].value;
  for (let i = 0; i < quantityRooms.length; i++) {
    toSetAttribute(quantityRooms.options[i], 'disabled', '');
    switch(guestOption) {
      case '0':
        deleteAttribute(quantityRooms.options[3], 'disabled');
        break;
      case '1':
        deleteAttribute(quantityRooms.options[0], 'disabled');
        deleteAttribute(quantityRooms.options[1], 'disabled');
        deleteAttribute(quantityRooms.options[2], 'disabled');
        break;
      case '2':
        deleteAttribute(quantityRooms.options[1], 'disabled');
        deleteAttribute(quantityRooms.options[2], 'disabled');
        break;
      case '3':
        deleteAttribute(quantityRooms.options[2], 'disabled');
        break;
    }
  }
};

const checkGuestsValidity = () => {
  if (quantityGuests.options[quantityGuests.selectedIndex].hasAttribute('disabled')) {
    quantityGuests.style.border = '4px solid rgb(217 38 2)';
    quantityGuests.setCustomValidity('Количество гостей больше количества комнат');
    return true;
  } else {
    quantityGuests.style.border = '';
    quantityGuests.setCustomValidity('');
    return false;
  }
};

const checkRoomsValidity = () => {
  if (quantityRooms.options[quantityRooms.selectedIndex].hasAttribute('disabled')) {
    quantityRooms.style.border = '4px solid rgb(217 38 2)';
    quantityRooms.setCustomValidity('Количество комнат меньше количества гостей');
    return true;
  } else {
    quantityRooms.style.border = '';
    quantityRooms.setCustomValidity('');
    return false;
  }
};

const checkRightValueBetweenTypeAndPrice = () => {
  const typeOption = typeHouse.options[typeHouse.selectedIndex];
  userPrice.min = PRICE_HOUSE_TYPES[typeOption.value];
  userPrice.placeholder = PRICE_HOUSE_TYPES[typeOption.value];
};

const synchronizeTimeInTimeOut = () => {
  const timeInOption = timeIn.options[timeIn.selectedIndex].value;

  for (let i = 0; i < timeIn.length; i++) {
    deleteAttribute(timeIn.options[i], 'selected');
    deleteAttribute(timeOut.options[i], 'selected');
    switch(timeInOption) {
      case '12:00':
        toSetAttribute(timeIn.options[0], 'selected', '');
        toSetAttribute(timeOut.options[0], 'selected', '');
        break;
      case '13:00':
        toSetAttribute(timeIn.options[1], 'selected', '');
        toSetAttribute(timeOut.options[1], 'selected', '');
        break;
      case '14:00':
        toSetAttribute(timeIn.options[2], 'selected', '');
        toSetAttribute(timeOut.options[2], 'selected', '');
        break;
    }
  }
};

const synchronizeTimeOutTimeIn = () => {
  const timeOutOption = timeOut.options[timeOut.selectedIndex].value;

  for (let i = 0; i < timeOut.length; i++) {
    deleteAttribute(timeIn.options[i], 'selected');
    deleteAttribute(timeOut.options[i], 'selected');
    switch(timeOutOption) {
      case '12:00':
        toSetAttribute(timeOut.options[0], 'selected', '');
        toSetAttribute(timeIn.options[0], 'selected', '');
        break;
      case '13:00':
        toSetAttribute(timeOut.options[1], 'selected', '');
        toSetAttribute(timeIn.options[1], 'selected', '');
        break;
      case '14:00':
        toSetAttribute(timeOut.options[2], 'selected', '');
        toSetAttribute(timeIn.options[2], 'selected', '');
        break;
    }
  }
};

/*const synchronizeTimeInTimeOut = () => {
  const timeInOption = timeIn.options[timeIn.selectedIndex];

  for (let i = 0; i < timeOut.length; i++) {
    if (timeInOption.value === timeOut.options[i].value) {
      toSetAttribute(timeOut.options[i], 'selected', '');
    } else {
      deleteAttribute(timeOut.options[i],'selected');
    }
  }
};

const synchronizeTimeOutTimeIn = () => {
  const timeOutOption = timeOut.options[timeOut.selectedIndex];

  for (let i = 0; i < timeIn.length; i++) {
    if (timeOutOption.value === timeIn.options[i].value) {
      toSetAttribute(timeIn.options[i], 'selected', '');
    } else {
      deleteAttribute(timeIn.options[i],'selected');
    }
  }
};*/

/*eslint-disable-next-line no-unused-vars*/
const showSuccesPopup = () => {
  const succesPopup = succesPopupTemplate.cloneNode(true);
  document.body.appendChild(succesPopup);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.body.removeChild(succesPopup);
    }
  });
  document.addEventListener('click', () => {
    document.body.removeChild(succesPopup);
  });
};

userAdTitle.addEventListener('input', checkTitleValidity);

userPrice.addEventListener('input', checkPriceValidity);

quantityRooms.addEventListener('change', checkRoomToGuestValue);

quantityGuests.addEventListener('change', checkGuestToRoomValue);

quantityRooms.addEventListener('change', checkRoomsValidity);

quantityGuests.addEventListener('change', checkGuestsValidity);

typeHouse.addEventListener('change', checkRightValueBetweenTypeAndPrice);

timeIn.addEventListener('change', synchronizeTimeInTimeOut);

timeOut.addEventListener('change', synchronizeTimeOutTimeIn);

form.addEventListener('submit', (evt) => {

  if(checkGuestsValidity()) {
    evt.preventDefault();
  }

  if(checkRoomsValidity()) {
    evt.preventDefault();
  }
});
