import {mapReset} from '../map.js';
import {filterEl, formEl} from '../forms.js';
import {resetPicture} from '../preview.js';
const resetAll = () =>{
  filterEl.reset();
  formEl.reset();
  mapReset();
  resetPicture();
};

export {resetAll};
