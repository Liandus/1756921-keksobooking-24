const loadUrl = 'https://24.javascript.pages.academy/keksobooking/data';
const sendUrl = 'https://24.javascript.pages.academy/keksobooking';
const dataLoad = (onSuccess, onError) => fetch(
  loadUrl,
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
    sendUrl,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      throw new Error(onError());
    })
    .catch((err) => {
      () => err;
    });
};

export {dataLoad, dataSend};

