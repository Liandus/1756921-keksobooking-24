const PRICE_HOUSE_TYPES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const QUANTITY_GUESTS_VALUE = {
  ONE_GUEST: '1',
  TWO_GUESTS: '2',
  THREE_GUESTS: '3',
  NO_GUESTS: '0',
};

const QUANTITY_ROOMS_VALUE = {
  ONE_ROOM: '1',
  TWO_ROOMS: '2',
  THREE_ROOMS: '3',
  HUNDRED_ROOMS: '100',
};

const STATE_WHEN_ROOMS_IS_VALID = {
  ONE_ROOM_VALIDITY: [QUANTITY_GUESTS_VALUE.ONE_GUEST],
  TWO_ROOMS_VALIDITY: [QUANTITY_GUESTS_VALUE.ONE_GUEST, QUANTITY_GUESTS_VALUE.TWO_GUESTS],
  THREE_ROOMS_VALIDITY: [QUANTITY_GUESTS_VALUE.ONE_GUEST, QUANTITY_GUESTS_VALUE.TWO_GUESTS, QUANTITY_GUESTS_VALUE.THREE_GUESTS],
  HUNDRED_ROOMS_VALIDITY: [QUANTITY_GUESTS_VALUE.NO_GUESTS],
};

const synchronizeTime = (selectedTime, changedTime) => {
  const timeInOption = selectedTime.options[selectedTime.selectedIndex];
  changedTime.value = timeInOption.value;
};

const checkTitleValidity = (inputWeNeedCheck, minQuantitySymbols, maxQuantitySymbols) => {
  const valueLength = inputWeNeedCheck.value.length;

  if (valueLength < minQuantitySymbols) {
    inputWeNeedCheck.setCustomValidity(`Заголовок слишком короткий, пожалуйста, введите еще ${minQuantitySymbols - valueLength} символа.`);
  } else if (valueLength > maxQuantitySymbols) {
    inputWeNeedCheck.setCustomValidity(`Заголовок слишком длиный, пожалуйста, удалите ${valueLength - maxQuantitySymbols} символа.`);
  } else {
    inputWeNeedCheck.setCustomValidity('');
  }
};

const setRightValueBetweenTypeAndPrice = (selectedType, changedPrice) => {
  const typeOption = selectedType.options[selectedType.selectedIndex];
  changedPrice.min = PRICE_HOUSE_TYPES[typeOption.value];
  changedPrice.placeholder = PRICE_HOUSE_TYPES[typeOption.value];
};

const checkPriceValidity = (inputWeNeedCheck, minPrice, maxPrice) => {
  const priceValue = inputWeNeedCheck.value;

  if (priceValue < minPrice) {
    inputWeNeedCheck.setCustomValidity(`Вы ввели неверное значение. Цена начинается от ${minPrice} руб.`);
  } else if (priceValue > maxPrice) {
    inputWeNeedCheck.setCustomValidity(`Вы превысили максимальное значение равное ${maxPrice} руб.`);
  } else {
    inputWeNeedCheck.setCustomValidity('');
  }
};

const checkRoomToGuestValidity = (evt, inputWeNeedCheck, inputMatch) => {
  const roomsOption = inputWeNeedCheck.options[inputWeNeedCheck.selectedIndex].value;

  switch(roomsOption) {
    case QUANTITY_ROOMS_VALUE.ONE_ROOM:
      if (!STATE_WHEN_ROOMS_IS_VALID.ONE_ROOM_VALIDITY.includes(inputMatch.value)) {
        inputWeNeedCheck.style.border = '4px solid rgb(217 38 2)';
        inputWeNeedCheck.setCustomValidity('Количество комнат не подходит под количество гостей');
        evt.preventDefault;
      } else {
        inputWeNeedCheck.style.border = '';
        inputWeNeedCheck.setCustomValidity('');
      }
      break;
    case QUANTITY_ROOMS_VALUE.TWO_ROOMS:
      if (!STATE_WHEN_ROOMS_IS_VALID.TWO_ROOMS_VALIDITY.includes(inputMatch.value)) {
        inputWeNeedCheck.style.border = '4px solid rgb(217 38 2)';
        inputWeNeedCheck.setCustomValidity('Количество комнат не подходит под количество гостей');
        evt.preventDefault;
      } else {
        inputWeNeedCheck.style.border = '';
        inputWeNeedCheck.setCustomValidity('');
      }
      break;
    case QUANTITY_ROOMS_VALUE.THREE_ROOMS:
      if (!STATE_WHEN_ROOMS_IS_VALID.THREE_ROOMS_VALIDITY.includes(inputMatch.value)) {
        inputWeNeedCheck.style.border = '4px solid rgb(217 38 2)';
        inputWeNeedCheck.setCustomValidity('Количество комнат не подходит под количество гостей');
        evt.preventDefault;
      } else {
        inputWeNeedCheck.style.border = '';
        inputWeNeedCheck.setCustomValidity('');
      }
      break;
    case QUANTITY_ROOMS_VALUE.HUNDRED_ROOMS:
      if (!STATE_WHEN_ROOMS_IS_VALID.HUNDRED_ROOMS_VALIDITY.includes(inputMatch.value)) {
        inputWeNeedCheck.style.border = '4px solid rgb(217 38 2)';
        inputWeNeedCheck.setCustomValidity('100 комнат? точно не для гостей!)');
        evt.preventDefault;
      } else {
        inputWeNeedCheck.style.border = '';
        inputWeNeedCheck.setCustomValidity('');
      }
      break;
  }
};

export {synchronizeTime, checkTitleValidity, setRightValueBetweenTypeAndPrice, checkPriceValidity, checkRoomToGuestValidity};
