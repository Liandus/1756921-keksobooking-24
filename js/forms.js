import {isEscapeKey} from './utils/is-escape.js';
import {synchronizeTime, checkTitleValidity, setRightValueBetweenTypeAndPrice, checkPriceValidity, checkRoomToGuestValidity} from './validators.js';

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
/*eslint-disable-next-line no-unused-vars*/
const INITIAL_AD_PRICE_VALUE_MIN = 0;
const AD_PRICE_VALUE_MAX = 1000000;
const AD_TITLE_LENGTH_MIN = 30;
const AD_TITLE_LENGTH_MAX = 100;
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

const onUserAdTitleElInput = () => {
  checkTitleValidity(userAdTitleEl, AD_TITLE_LENGTH_MIN, AD_TITLE_LENGTH_MAX);
};

const onUserPriceElInput = () => {
  checkPriceValidity(userPriceEl, adPriceValueMin, AD_PRICE_VALUE_MAX);
};

const onTypeHouseElChange = () => {
  setRightValueBetweenTypeAndPrice(typeHouseEl, userPriceEl);
};

const onTimeInElChange = () => {
  synchronizeTime(timeInEl, timeOutEl);
};

const onTimeOutElChange = () => {
  synchronizeTime(timeOutEl, timeInEl);
};

const onsubmitButtonElClick = (evt) => {
  checkRoomToGuestValidity(evt, quantityRoomsEl, quantityGuestsEl);
};

userAdTitleEl.addEventListener('input', onUserAdTitleElInput);

userPriceEl.addEventListener('input', onUserPriceElInput);

typeHouseEl.addEventListener('change', onTypeHouseElChange);

timeInEl.addEventListener('change', onTimeInElChange);

timeOutEl.addEventListener('change', onTimeOutElChange);

submitButtonEl.addEventListener('click', onsubmitButtonElClick);
