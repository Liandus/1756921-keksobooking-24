import {setPreviewListener} from './preview.js';
import {setSubmitListener} from './forms.js';
import {dataLoad} from './server-api.js';
import {showErrorMessage} from './utils/error-message.js';
import {loadToMarkers} from './map.js';
import {activateForm, deactivateForm} from './forms-act-deact.js';

deactivateForm();

setPreviewListener();

dataLoad(loadToMarkers, showErrorMessage, activateForm);

setSubmitListener();

