'use strict';

const { appDir, exists, get, Page, read } = require('hephaestus');
const _ = require('underscore');
const { resolve } = require('path');

module.exports = class Interview extends Page {
  init () {
    const datasource = resolve(appDir(), 'app/localsource/subjects.json');
    const appUrl = get('appUrl');
    const id = 'interviews';
    const title = 'Interviews';
    const route = '/interviews/index.html';  
    let content = {
      main: {
        title: 'Browse all interviews',
        interviewee: []
      }
    };
    if (exists(datasource)) {
      const source = read.json(datasource);
      _.each(source.response.docs, document => {
        let name = document.name.replace(' ', '-')
        content.main.interviewee.push({
          url: `${appUrl}/interviews/${name.toLowerCase()}/index.html`,
          name: document.name,
          description: document.bio
        });
      });
      this.render({ id: id, title: 'Browse all interviews', route: route, content: content });
    }
  }  
};
