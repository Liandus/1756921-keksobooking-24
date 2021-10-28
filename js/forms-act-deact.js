import {deleteAttribute} from './utils/del-attribute.js';
import {setAttributeOnElement} from './utils/set-attribute.js';
import {setOrDelSomeAttributeOnChild} from './utils/work-with-child-elements.js';

const adForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');

const deactivateForm = () => {
  setOrDelSomeAttributeOnChild(filterForm, setAttributeOnElement, 'disabled');
  setOrDelSomeAttributeOnChild(adForm, setAttributeOnElement, 'disabled');
  adForm.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');
};

const activateForm = () => {
  setOrDelSomeAttributeOnChild(filterForm, deleteAttribute, 'disabled');
  setOrDelSomeAttributeOnChild(adForm, deleteAttribute, 'disabled');
  adForm.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');
};

export {deactivateForm, activateForm};
