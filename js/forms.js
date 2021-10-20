import {deactivateForm, activateForm} from './forms-act-deact.js';
deactivateForm();

const form = document.querySelector('.ad-form');
const userAdTitle = form.querySelector('#title');
const userPrice = form.querySelector('#price');
const quantityRooms = form.querySelector('#room_number');
const quantityGuests = form.querySelector('#capacity');
const guestOption = quantityGuests.options[quantityGuests.selectedIndex];
const AD_PRICE_VALUE_MIN = 0;
const AD_PRICE_VALUE_MAX = 1000000;
const AD_TITLE_LENGTH_MIN = 30;
const AD_TITLE_LENGTH_MAX = 100;

window.onload = () => {
  activateForm();
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

  userAdTitle.reportValidity();
};

const checkPriceValidity = () => {
  const priceValue = userPrice.value;

  if (priceValue < AD_PRICE_VALUE_MIN) {
    userPrice.setCustomValidity(`Вы ввели отрицательное значение, мы не будем вам платить!). Цена начинается от ${AD_PRICE_VALUE_MIN} руб.`);
  } else if (priceValue > AD_PRICE_VALUE_MAX) {
    userPrice.setCustomValidity(`Вы превысили максимальное значение равное ${AD_PRICE_VALUE_MAX} руб.`);
  } else {
    userPrice.setCustomValidity('');
  }

  userPrice.reportValidity();
};

const checkRoomAndGuestValidity = () => {
  const roomsOption = quantityRooms.options[quantityRooms.selectedIndex];

  for (let i = 0; i < quantityGuests.length; i++) {
    if (roomsOption.value < quantityGuests.options[i].value) {
      quantityGuests.options[i].setAttribute('disabled', '');
    } else if (roomsOption.value === '100') {
      quantityGuests.options[0, 1, 2].setAttribute('disabled', '');
    }
  }
};

userAdTitle.addEventListener('input', checkTitleValidity);

userPrice.addEventListener('input', checkPriceValidity);

quantityRooms.addEventListener('change', checkRoomAndGuestValidity);

form.addEventListener('submit', (evt) => {
  if(guestOption.hasAttribute('disabled')) {
    evt.preventDefault();
  }
});
