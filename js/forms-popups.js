import {resetAll} from './utils/reset.js';
import {isEscapeKey} from './utils/is-escape.js';
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
const tryAgainButton = document.querySelector('.error__button');


const showPopup = (template) => {
  const popup = template.cloneNode(true);

  const onDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup(popup);
    }
  };

  function closePopup () {
    document.body.removeChild(popup);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  }

  function openPopup () {
    document.body.appendChild(popup);
    document.addEventListener('keydown', onDocumentEscKeydown);
  }

  document.addEventListener('keydown', onDocumentEscKeydown);

  openPopup();

  popup.addEventListener('click', () => closePopup(popup));
  //TODO вынести обработчик или проверять на существование
  tryAgainButton && tryAgainButton.addEventListener('click', () => closePopup(popup));
};

const showSuccessPopup = () => {
  resetAll();
  showPopup(successPopupTemplate);
};

const showErrorPopup = () => showPopup(errorPopupTemplate);

export {showSuccessPopup, showErrorPopup};
