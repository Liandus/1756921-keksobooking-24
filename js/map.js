import {activateForm, deactivateForm} from './forms-act-deact.js';
import {showAdvertisement} from './advertisements.js';
import {advertisementList} from './advertisement-generator.js';
const addressEl = document.querySelector('#address');

const getAddress = (markerCoordinate) => {
  const markerPoints = Object.values(markerCoordinate);
  addressEl.value = `${markerPoints[0].toFixed(5)}, ${markerPoints[1].toFixed(5)}`;
};

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: 35.71247,
    lng: 139.78967,
  }, 12);

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
    .addTo(map)
    .bindPopup(showAdvertisement(point));
};

const mainMarker = L.marker(
  {
    lat: 35.71247,
    lng: 139.78967,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

advertisementList.forEach((advertisementEl) => {
  createMarkers(advertisementEl);
});

/*TODO не работает с этой же функцией хотя по сути должно, попробовать разобраться
addressEl.value = getAddress(mainMarker.getLatLng());
хотя запись ниже работает!
*/
addressEl.value = Object.values(mainMarker.getLatLng()).join(', ');

mainMarker.on('moveend', (evt) => {
  getAddress(evt.target.getLatLng());
});
