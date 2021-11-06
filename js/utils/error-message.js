const MESSAGE_SHOW_TIME = 5000;
const errorMessageTemplate = document.querySelector('#error-connect').content.querySelector('.error-connect');

const showErrorMessage = (error) => {
  const errorBody = errorMessageTemplate.cloneNode(true);
  const errorMessage = errorBody.querySelector('.error-connect-message');
  errorMessage.textContent = error;
  document.body.appendChild(errorBody);

  setTimeout(() => {
    document.body.removeChild(errorBody);
  }, MESSAGE_SHOW_TIME);
};

export {showErrorMessage};
