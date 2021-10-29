import {PriceHouseTypes, QuantityRoomsValue, StateWhenRoomsIsValid} from './consts.js';

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

const setPriceByHouseType = (selectedType, changedPrice) => {
  const typeOption = selectedType.options[selectedType.selectedIndex];
  changedPrice.min = PriceHouseTypes[typeOption.value];
  changedPrice.placeholder = PriceHouseTypes[typeOption.value];
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

/*TODO пока сделал так, если перенести константы инпутов и селектов сюда из forms вероятно все сделать покрасивее получится,
 и возможно это решит проблему с синхронайз тайм*/
const checkRoomToGuestValidity = (evt, inputWeNeedCheck, inputMatch) => {
  const roomsOption = inputWeNeedCheck.options[inputWeNeedCheck.selectedIndex].value;

  const isRoomValid = (whichRoom, whatMessage) => {
    if (!whichRoom.includes(inputMatch.value)) {
      inputWeNeedCheck.style.border = '4px solid rgb(217 38 2)';
      inputWeNeedCheck.setCustomValidity(whatMessage);
      evt.preventDefault;
    } else {
      inputWeNeedCheck.style.border = '';
      inputWeNeedCheck.setCustomValidity('');
    }
  };

  switch(roomsOption) {
    case QuantityRoomsValue.ONE_ROOM:
      isRoomValid(StateWhenRoomsIsValid.ONE_ROOM_VALIDITY, 'Количество комнат не подходит под количество гостей');
      break;
    case QuantityRoomsValue.TWO_ROOMS:
      isRoomValid(StateWhenRoomsIsValid.TWO_ROOMS_VALIDITY, 'Количество комнат не подходит под количество гостей');
      break;
    case QuantityRoomsValue.THREE_ROOMS:
      isRoomValid(StateWhenRoomsIsValid.THREE_ROOMS_VALIDITY, 'Количество комнат не подходит под количество гостей');
      break;
    case QuantityRoomsValue.HUNDRED_ROOMS:
      isRoomValid(StateWhenRoomsIsValid.HUNDRED_ROOMS_VALIDITY, '100 комнат? точно не для гостей!)');
      break;
  }
};

export {synchronizeTime, checkTitleValidity, setPriceByHouseType, checkPriceValidity, checkRoomToGuestValidity};
