const dataLoad = (onSuccess, onError) => fetch(
  'https://24.javascript.pages.academy/keksobooking/data',
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
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      onError();
    });
  /*.catch(() => {
      onError();
    });*/
};

export {dataLoad, dataSend};

