const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const userPictureContainerEl = document.querySelector('.ad-form-header__preview');
const userPictureEl = userPictureContainerEl.querySelector('img');
const userPictureInput = document.querySelector('#avatar');
const housePictureContainerEl = document.querySelector('.ad-form__photo');
const housePictureInput = document.querySelector('#images');
const housePictureEl = document.createElement('img');
const PICTURE_WIDTH = '70';
const PICTURE_HEIGHT = '70';
const PICTURE_ALT = 'Фото дома';
const INITIAL_USER_PICTURE_SRC = 'img/muffin-grey.svg';

const resetPicture = () => {
  housePictureEl.remove();
  userPictureEl.src = INITIAL_USER_PICTURE_SRC;
};

const createPicture = () => {
  housePictureEl.width = PICTURE_WIDTH;
  housePictureEl.height = PICTURE_HEIGHT;
  housePictureEl.alt = PICTURE_ALT;

  return housePictureContainerEl.appendChild(housePictureEl);
};

const changeSrc = (object, match, src) => {
  if (match) {
    object.src = URL.createObjectURL(src);
  }

  return object;
};

const onPictureInputChange = (pictureEl, pictureInput) => {
  const file = pictureInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  changeSrc(pictureEl, matches, file);
};

const setPreviewListener = () => {
  housePictureInput.addEventListener('change', () => onPictureInputChange(createPicture(), housePictureInput));
  userPictureInput.addEventListener('change', () => onPictureInputChange(userPictureEl, userPictureInput));
};

export {setPreviewListener, resetPicture};
