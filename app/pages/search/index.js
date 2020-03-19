const { 
  get,
  copy,
  appDir,
  appBuildDir
} = require('hephaestus');

const {
  resolve
} = require('path');

// Azure
// apikey: get('DISCOVERY_APIKEY'),
// apiversion: get('DISCOVERY_VERSION'),
copy(
  resolve(appDir(), 'app/pages/interview/transcripts'),
  resolve(appBuildDir(), 'search-index-documents'), error => {
    if (error) {
      return console.error(error);
    }
  }
);

module.exports = {
  id: 'search',
  title: 'Search results',
  route: '/search/index.html',
  discovery: get('DISCOVERY_ENDPOINT'),
  assets: {
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
      'ui.aws.js'
    ]
  }
};
