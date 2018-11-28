'use strict';

const { agartha } = require('hephaestus');
const appUrl = agartha.get('BEARD_APP_URL');
const appRoot = agartha.get('BEARD_APP_ROOT');

module.exports = exports = {
  appName: 'Voices from the Food Revolution: People Who Changed The Way Americans Eat',
  description: 'An oral history project conducted by Judith Weinraub. Made possible with a grant from the Leon Levy Foundation',
  shortName: 'beard',
  appUrl: (appUrl) ? appUrl : 'http://127.0.0.1:8080',
  appRoot:  (appRoot) ? appRoot : 'http://127.0.0.1:8080',
  relic: 'scaffold',
  version: '0.0.1',
  hephaestus: '2.0.0'
};
