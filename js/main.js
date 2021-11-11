import {submitListener} from './forms.js';
import {dataLoad} from './server-api.js';
import {showErrorMessage} from './utils/error-message.js';
import {loadToMarkers} from './map.js';

dataLoad(loadToMarkers, showErrorMessage);

submitListener();

