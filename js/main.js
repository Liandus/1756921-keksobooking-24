import {previewListener} from './preview.js';
import {submitListener} from './forms.js';
import {dataLoad} from './server-api.js';
import {showErrorMessage} from './utils/error-message.js';
import {loadToMarkers, loadMap} from './map.js';
import {activateForm, deactivateForm} from './forms-act-deact.js';

deactivateForm();

loadMap(activateForm());

previewListener();

dataLoad(loadToMarkers, showErrorMessage);

submitListener();

