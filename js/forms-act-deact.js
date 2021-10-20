import {deleteAttribute} from './utils/del-attribute.js';
import {getAttribute} from './utils/get-attribute.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
const filterFormSelects = filterForm.querySelectorAll('.map__filter');
const filterFormFieldset = filterForm.querySelector('.map__features');

const deactivateForm = () => {
  getAttribute(adFormFieldsets, 'disabled', '');
  getAttribute(filterFormSelects, 'disabled', '');
  filterFormFieldset.setAttribute('disabled', '');
  adForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
};

const activateForm = () => {
  deleteAttribute(adFormFieldsets, 'disabled');
  deleteAttribute(filterFormSelects, 'disabled');
  filterFormFieldset.removeAttribute('disabled');
  adForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
};

export {deactivateForm, activateForm};
