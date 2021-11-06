import {resetAll} from './utils/reset.js';
import {isEscapeKey} from './utils/is-escape.js';
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const tryAgainButton = document.querySelector('.error__button');

const close = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onDocumentEscKeydown = (evt) => {
  close(evt);
};

function closePopup  (popup)  {
  document.body.removeChild(popup);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

function openPopup (popup) {
  document.body.appendChild(popup);
  document.addEventListener('keydown', onDocumentEscKeydown);
}

const showPopup = (template) => {
  const popup = template.cloneNode(true);

  openPopup(popup);

  document.addEventListener('keydown', onDocumentEscKeydown);

  popup.addEventListener('click', () => {
    closePopup(popup);
  });

  tryAgainButton.addEventListener('click', () => {
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
