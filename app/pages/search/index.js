'use strict';

const { get } = require('hephaestus');
const host = get('ROSIE_HOST');
const port = get('ROSIE_PORT');
const protocol = get('ROSIE_PROTOCOL');
const solrPath = get('ROSIE_SOLR_PATH');

module.exports = {
  id : 'search',
  title : 'Search results',
  route : '/search/index.html',
  host : (host) ? host : 'media.local',
  port : (port) ? port : 8983,
  protocol : (protocol) ? protocol : 'http',
  path : (solrPath) ? solrPath : 'solr/rosie',
  rows : 100,
  start : 0,
  assets : {
    js : [
      'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js',
      'axios-solr-client.js',
      'ui.js'
    ]
  }
};
