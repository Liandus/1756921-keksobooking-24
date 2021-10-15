import {advertismentList} from './advertisment-generator.js';

const advertismentsBlock = document.querySelector('.map__canvas');
const advertismentTemplate = document.querySelector('#card').content.querySelector('.popup');

const  TYPES_OF_HOISING = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const getCyrillicNameOfTypeHouse = (object, value) => {
  for (const key in object) {
    if (key === value) {
      return object[key];
    }
  }
};

advertismentList.forEach((add) => {
  const advertisment = advertismentTemplate.cloneNode(true);
  const featureList = advertisment.querySelectorAll('.popup__feature');
  const modificators = add.offer.features.map((feature) => `popup__feature--${feature}`);
  const photoContainer = advertisment.querySelector('.popup__photos');
  const photoTemplate = photoContainer.querySelector('.popup__photo');

  for (let i = 0; i < add.offer.photos.length; i++) {
    const photo = photoTemplate.cloneNode(true);
    photo.classList.add(`popup__photo-${i + 1}`);
    photo.src = add.offer.photos[i];
    photoContainer.appendChild(photo);
  }

  photoContainer.removeChild(photoTemplate);

  featureList.forEach((featureListItem) => {
    const modificator = featureListItem.classList[1];
    if (!modificators.includes(modificator)) {
      featureListItem.remove();
    }
  });

  advertisment.querySelector('.popup__title').textContent = add.offer.title;
  advertisment.querySelector('.popup__text--address').textContent = add.offer.address;
  advertisment.querySelector('.popup__text--price').textContent = `${add.offer.price} ₽/ночь`;
  advertisment.querySelector('.popup__text--capacity').textContent = `${add.offer.rooms} комнаты для ${add.offer.guests} гостей`;
  advertisment.querySelector('.popup__text--time').textContent = `Заезд после ${add.offer.checkin}, выезд до ${add.offer.checkout}`;
  advertisment.querySelector('.popup__description').textContent = add.offer.description;
  advertisment.querySelector('.popup__avatar').src = add.author.avatar;
  advertisment.querySelector('.popup__type').textContent = getCyrillicNameOfTypeHouse(TYPES_OF_HOISING, add.offer.type);

  advertismentsBlock.appendChild(advertisment);
});
