import {setPreviewListener} from './preview.js';
import {setSubmitListener} from './forms.js';
import {dataLoad} from './server-api.js';
import {showErrorMessage} from './utils/error-message.js';
import {loadToMarkers} from './map.js';
import {activateForms, deactivateForms, activateAdvertismentForm} from './forms-act-deact.js';

deactivateForms();

setPreviewListener();

dataLoad(loadToMarkers, showErrorMessage, activateForms, activateAdvertismentForm);

setSubmitListener();

