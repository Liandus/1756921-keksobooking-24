import {deleteAttribute} from './utils/del-attribute.js';
import {toSetAttribute} from './utils/get-attribute.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
const filterFormSelects = filterForm.querySelectorAll('.map__filter');
const filterFormFieldset = filterForm.querySelector('.map__features');

const deactivateForm = () => {
  adFormFieldsets.forEach((fieldEl) => {
    toSetAttribute(fieldEl, 'disabled', '');
  });
  filterFormSelects.forEach((fieldEl) => {
    toSetAttribute(fieldEl, 'disabled', '');
  });
  toSetAttribute(filterFormFieldset, 'disabled', '');
  adForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
};

const activateForm = () => {
  adFormFieldsets.forEach((fieldEl) => {
    deleteAttribute(fieldEl, 'disabled');
  });
  filterFormSelects.forEach((fieldEl) => {
    deleteAttribute(fieldEl, 'disabled');
  });
  deleteAttribute(filterFormFieldset, 'disabled');
  adForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
};

export {deactivateForm, activateForm};
