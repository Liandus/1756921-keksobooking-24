import './forms.js';
import {deactivateForm, activateForm} from './forms-act-deact.js';
import {showAdvertisement} from './advertisements.js';
deactivateForm();

window.onload = () => {
  activateForm();
};

showAdvertisement();
