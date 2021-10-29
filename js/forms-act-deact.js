import {deleteAttribute} from './utils/del-attribute.js';
import {setAttributeOnElement} from './utils/set-attribute.js';
import {setAttributeOnChild} from './utils/work-with-child-elements.js';

const adFormEl = document.querySelector('.ad-form');
const filterFormEl = document.querySelector('.map__filters');

const deactivateForm = () => {
  setAttributeOnChild(filterFormEl, setAttributeOnElement, 'disabled');
  setAttributeOnChild(adFormEl, setAttributeOnElement, 'disabled');
  adFormEl.classList.add('ad-form--disabled');
  filterFormEl.classList.add('map__filters--disabled');
};

const activateForm = () => {
  setAttributeOnChild(filterFormEl, deleteAttribute, 'disabled');
  setAttributeOnChild(adFormEl, deleteAttribute, 'disabled');
  adFormEl.classList.remove('ad-form--disabled');
  filterFormEl.classList.remove('map__filters--disabled');
};

export {deactivateForm, activateForm};
