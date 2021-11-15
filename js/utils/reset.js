import {mapReset} from '../map.js';
import {filterEl, formEl, resetPricePlaceholder} from '../forms.js';
import {resetPicture} from '../preview.js';
const resetAll = () =>{
  resetPricePlaceholder();
  filterEl.reset();
  formEl.reset();
  mapReset();
  resetPicture();
};

export {resetAll};
