import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';
import { transform } from 'ol/proj';

//Define positions for the state
const nsw_nw = [140.8, -28.0];
const nsw_se = [153.8, -37.7];
const nsw_centre = [148.91, -32.66];

//Helper function to convert Coordinates from EPSG:4326 to EPSG:3857
const convertCoordsTo3857 = (coords) => {
  return transform(coords, 'EPSG:4326', 'EPSG:3857');
};

const layers = [
  new TileLayer({
    source: new OSM(),
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'https://gs-seamless.geoscience.nsw.gov.au/geoserver/ows/',
      params: {
        layers: 'seamless_nsw_geology:nsw_layer_group',
        tiled: true,
        width: 256,
        height: 256,
      },
      extent: [...convertCoordsTo3857(nsw_nw), ...convertCoordsTo3857(nsw_se)],
      serverType: 'geoserver',
    }),
  }),
];

const map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    center: convertCoordsTo3857(nsw_centre),
    zoom: 5,
    maxZoom: 10,
  }),
});
