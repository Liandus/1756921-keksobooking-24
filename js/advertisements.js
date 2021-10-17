import {advertisementList} from './advertisement-generator.js';

const advertisementsBlock = document.querySelector('.map__canvas');
const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const HOUSE_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const showAdvertisement = () => {
  advertisementList.forEach((ad) => {
    const advertisement = advertisementTemplate.cloneNode(true);
    const featureList = advertisement.querySelectorAll('.popup__feature');
    const photoContainer = advertisement.querySelector('.popup__photos');
    const photoTemplate = photoContainer.querySelector('.popup__photo');

    if (!ad.offer.features) {
      advertisement.querySelector('.popup__features').remove();
    } else {
      const modificators = ad.offer.features.map((featureEl) => `popup__feature--${featureEl}`);
      featureList.forEach((featureEl) => {
        const modificator = featureEl.classList[1];
        if (!modificators.includes(modificator)) {
          featureEl.remove();
        }
      });
    }

    if (!ad.offer.photos) {
      photoContainer.remove();
    } else {
      for (let i = 0; i < ad.offer.photos.length; i++) {
        const photo = photoTemplate.cloneNode(true);
        photo.classList.add(`popup__photo-${i + 1}`);
        photo.src = ad.offer.photos[i];
        photoContainer.appendChild(photo);
      }
    }

    photoContainer.removeChild(photoTemplate);

    advertisement.querySelector('.popup__title').textContent = ad.offer.title;
    advertisement.querySelector('.popup__text--address').textContent = ad.offer.address;
    advertisement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
    advertisement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    advertisement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    advertisement.querySelector('.popup__description').textContent = ad.offer.description;
    advertisement.querySelector('.popup__avatar').src = ad.author.avatar;
    advertisement.querySelector('.popup__type').textContent = HOUSE_TYPES[ad.offer.type];

    advertisementsBlock.appendChild(advertisement);
  });
};

export {showAdvertisement};
