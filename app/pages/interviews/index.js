'use strict'

const { agartha } = require('hephaestus');

module.exports = exports = class Interview extends agartha.Page {
  init () {
    /**
     * Hephaestus it's already present
     */
    const he = this.hephaestus;
    const datasource = he.path.join(he.appDir(), 'app/localsource/subjects.json');
    const appUrl = he.get('appUrl');
    const id = 'interviews';
    const title = 'Interviews';
    const route = '/interviews/index.html';  
    let content = {
      main: {
        title: 'Browse all interviews',
        interviewee: []
      }
    };
    if (he.exists(datasource)) {
      const source = he.read.json(datasource);
      he._.each(source.response.docs, (document) => {
        let name = document.name.replace(' ', '-')
        content.main.interviewee.push({
          url: appUrl + '/interviews/' + name.toLowerCase() + '/index.html',
          name: document.name,
          description: document.bio
        });
      });      
      /**
       * Pages need 'id' and 'route' properties
       */
      this.render({
        id: id,
        title: 'Browse all interviews',
        route: route,
        content: content
      });
    }
  }  
};
