import {isEscapeKey} from './utils/is-escape.js';
import {synchronizeTime, checkTitleValidity, setPriceByHouseType, checkPriceValidity, checkRoomToGuestValidity} from './validators.js';

const formEl = document.querySelector('.ad-form');
const userAdTitleEl = formEl.querySelector('#title');
const userPriceEl = formEl.querySelector('#price');
const quantityRoomsEl = formEl.querySelector('#room_number');
const quantityGuestsEl = formEl.querySelector('#capacity');
const typeHouseEl = formEl.querySelector('#type');
const timeInEl = formEl.querySelector('#timein');
const timeOutEl = formEl.querySelector('#timeout');
const submitButtonEl = formEl.querySelector('.ad-form__submit');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const INITIAL_AD_PRICE_VALUE_MIN = 0;
const AD_PRICE_VALUE_MAX = 1000000;
const AD_TITLE_LENGTH_MIN = 30;
const AD_TITLE_LENGTH_MAX = 100;
userPriceEl.min = INITIAL_AD_PRICE_VALUE_MIN;
const adPriceValueMin = userPriceEl.min;

/*eslint-disable-next-line no-unused-vars*/
const showSuccesPopup = () => {
  const succesPopup = successPopupTemplate.cloneNode(true);
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

const onUserAdTitleInput = () => {
  checkTitleValidity(userAdTitleEl, AD_TITLE_LENGTH_MIN, AD_TITLE_LENGTH_MAX);
};

const onUserPriceInput = () => {
  checkPriceValidity(userPriceEl, adPriceValueMin, AD_PRICE_VALUE_MAX);
};

const onTypeHouseChange = () => {
  setPriceByHouseType(typeHouseEl, userPriceEl);
};
//TODO сделал один обработчик, перестала работать синхронизация, попробовать разобраться в чем дело
/*eslint-disable-next-line no-unused-vars*/
const onTimeChange = (selectTime, changeTime) => {
  synchronizeTime(selectTime, changeTime);
};

const onTimeInChange = () => {
  synchronizeTime(timeInEl, timeOutEl);
};

const onTimeOutChange = () => {
  synchronizeTime(timeOutEl, timeInEl);
};

const onSubmitButtonClick = (evt) => {
  checkRoomToGuestValidity(evt, quantityRoomsEl, quantityGuestsEl);
};

userAdTitleEl.addEventListener('input', onUserAdTitleInput);

userPriceEl.addEventListener('input', onUserPriceInput);

typeHouseEl.addEventListener('change', onTypeHouseChange);

timeInEl.addEventListener('change', onTimeInChange);

timeOutEl.addEventListener('change', onTimeOutChange);

submitButtonEl.addEventListener('click', onSubmitButtonClick);
