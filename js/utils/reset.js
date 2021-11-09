import {mapReset} from '../map.js';
import {filterEl, formEl} from '../forms.js';
const resetAll = () =>{
  filterEl.reset();
  formEl.reset();
  mapReset();
};

export {resetAll};
