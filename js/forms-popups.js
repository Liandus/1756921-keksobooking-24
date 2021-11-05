import {resetAll} from './utils/reset.js';
import {isEscapeKey} from './utils/is-escape.js';
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const tryAgainButtonEl = document.querySelector('.error__button');

const closePopup = (popup) => {
  document.body.removeChild(popup);
};

const addPopup = (popup) => {
  document.body.appendChild(popup);
};

const showPopup = (template) => {
  const popup = template.cloneNode(true);
  addPopup(popup);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup(popup);
    }
  });
  document.addEventListener('click', () => {
    closePopup(popup);
  });
  tryAgainButtonEl.addEventListener('click', () => {
    closePopup(popup);
  });
};

const showSuccessPopup = () => {
  resetAll();
  showPopup(successPopupTemplate);
};

const showErrorPopup = () => {
  showPopup(errorPopupTemplate);
};

export {showSuccessPopup, showErrorPopup};
