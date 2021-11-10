import {activateForm, deactivateForm} from './forms-act-deact.js';
import {showAdvertisement} from './advertisements.js';
import {dataLoad} from './server-api.js';
import {showErrorMessage} from './utils/error-message.js';
import {changeListener} from './filter.js';
const addressEl = document.querySelector('#address');
const MAP_INITIAL_LAT = 35.71247;
const MAP_INITIAL_LNG = 139.78967;
const MAP_INITIAL_ZOOM = 12;
const ADVERTISEMENT_COUNT = 10;

const getAddress = (markerCoordinate) => {
  const markerPoints = Object.values(markerCoordinate);
  return `${markerPoints[0].toFixed(5)}, ${markerPoints[1].toFixed(5)}`;
};

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: MAP_INITIAL_LAT,
    lng: MAP_INITIAL_LNG,
  }, MAP_INITIAL_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarkers = (point) => {
  const pinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const secondaryMarker = L.marker(
    {
      lat: point.location.lat,
      lng: point.location.lng,
    },
    {
      icon: pinIcon,
    },
  );
  secondaryMarker
    .addTo(markerGroup)
    .bindPopup(showAdvertisement(point));
};

const mainMarker = L.marker(
  {
    lat: MAP_INITIAL_LAT,
    lng: MAP_INITIAL_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

const loadToMarkers = (data) => {
  data
    .slice(0, ADVERTISEMENT_COUNT)
    .forEach((dataEl) => {
      createMarkers(dataEl);
    });

  changeListener(data, ADVERTISEMENT_COUNT, createMarkers);
};

dataLoad(loadToMarkers, showErrorMessage);

addressEl.value = getAddress(mainMarker.getLatLng());

mainMarker.on('moveend', (evt) => {
  addressEl.value = getAddress(evt.target.getLatLng());
});

const mapReset = () => {
  mainMarker.setLatLng({
    lat: MAP_INITIAL_LAT,
    lng: MAP_INITIAL_LNG,
  });

  map.setView({
    lat: MAP_INITIAL_LAT,
    lng: MAP_INITIAL_LNG,
  }, MAP_INITIAL_ZOOM);

  map.closePopup();

  addressEl.value = getAddress(mainMarker.getLatLng());
};

export {mapReset, markerGroup};
