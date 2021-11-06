import {synchronizeTime, checkTitleValidity, setPriceByHouseType, checkPriceValidity, checkRoomToGuestValidity} from './validators.js';
import {dataSend} from './server-api.js';
import {resetAll} from './utils/reset.js';
import {showSuccessPopup, showErrorPopup} from './forms-popups.js';
const filterEl = document.querySelector('.map__filters');
const formEl = document.querySelector('.ad-form');
const userAdTitleEl = formEl.querySelector('#title');
const userPriceEl = formEl.querySelector('#price');
const quantityRoomsEl = formEl.querySelector('#room_number');
const quantityGuestsEl = formEl.querySelector('#capacity');
const typeHouseEl = formEl.querySelector('#type');
const timeInEl = formEl.querySelector('#timein');
const timeOutEl = formEl.querySelector('#timeout');
const submitButton = formEl.querySelector('.ad-form__submit');
const resetButton = formEl.querySelector('.ad-form__reset');
const INITIAL_AD_PRICE_VALUE_MIN = 0;
const AD_PRICE_VALUE_MAX = 1000000;
const AD_TITLE_LENGTH_MIN = 30;
const AD_TITLE_LENGTH_MAX = 100;
userPriceEl.min = INITIAL_AD_PRICE_VALUE_MIN;
const adPriceValueMin = userPriceEl.min;

const submitForm = () => {
  dataSend(
    () => showSuccessPopup(),
    () => showErrorPopup(),
    new FormData(formEl),
  );
};

const onUserAdTitleInput = () => {
  checkTitleValidity(userAdTitleEl, AD_TITLE_LENGTH_MIN, AD_TITLE_LENGTH_MAX);
};

const onUserPriceInput = () => {
  checkPriceValidity(userPriceEl, adPriceValueMin, AD_PRICE_VALUE_MAX);
};

const onTypeHouseChange = () => {
  setPriceByHouseType(typeHouseEl, userPriceEl);
};

const onTimeChange = (selectTime, changeTime) => {
  synchronizeTime(selectTime, changeTime);
};

const onSubmitButtonClick = (evt) => {
  checkRoomToGuestValidity(evt, quantityRoomsEl, quantityGuestsEl);
};
const onResetClick = () => {
  resetAll();
};

const onSubmit = (evt) => {
  evt.preventDefault();
  submitForm();
};

userAdTitleEl.addEventListener('input', onUserAdTitleInput);

userPriceEl.addEventListener('input', onUserPriceInput);

typeHouseEl.addEventListener('change', onTypeHouseChange);

timeInEl.addEventListener('change', () => onTimeChange(timeInEl, timeOutEl));

timeOutEl.addEventListener('change', () => onTimeChange(timeOutEl, timeInEl));

submitButton.addEventListener('click', onSubmitButtonClick);

resetButton.addEventListener('click', onResetClick);

formEl.addEventListener('submit', onSubmit);

export {filterEl, formEl};
