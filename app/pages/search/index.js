const { 
  get
} = require('hephaestus');

module.exports = {
  id: 'search',
  title: 'Search results',
  route: '/search/index.html',
  discovery: get('DISCOVERY_ENDPOINT'),
  apikey: get('DISCOVERY_APIKEY'),
  apiversion: get('DISCOVERY_VERSION'),
  assets: {
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
      'ui.js'
    ]
  }
};
