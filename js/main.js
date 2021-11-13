import {previewListener} from './preview.js';
import {submitListener} from './forms.js';
import {dataLoad} from './server-api.js';
import {showErrorMessage} from './utils/error-message.js';
import {loadToMarkers} from './map.js';
import {activateForm, deactivateForm} from './forms-act-deact.js';

deactivateForm();

previewListener();

dataLoad(loadToMarkers, showErrorMessage, activateForm);

submitListener();

