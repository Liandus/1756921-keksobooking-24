const LOAD_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://24.javascript.pages.academy/keksobooking';
const dataLoad = (onSuccess, onError) => fetch(
  LOAD_URL,
  {
    method: 'GET',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Извините, что-то пошло не так,попробуйте перезагрузить страницу.');
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

const dataSend = (onSuccess, onError, body) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      return onError();
    })
    .catch(() => {
      onError();
    });
};

export {dataLoad, dataSend};

