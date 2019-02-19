'use strict';

const {
  appDir,
  exists,
  get,
  Page,
  read
} = require('hephaestus');
const _ = require('underscore');
const {
  resolve
} = require('path');

class Interview extends Page {
  init() {
    const datasource = resolve(appDir(), 'app/localsource/subjects.json');
    const appUrl = get('appUrl');
    let content = {
      main: {
        title: 'Browse all interviews',
        interviewee: []
      }
    };
    if (exists(datasource)) {
      const source = read.json(datasource);
      _.each(_.sortBy(source.response.docs, 'sort'), document => {
        content.main.interviewee.push({
          url: `${appUrl}/interviews/${document.name.replace(/ /g, '-').toLowerCase()}/index.html`,
          name: document.name,
          description: document.bio
        });
      });
      this.render({
        id: 'interviews',
        title: 'Browse all interviews',
        route: '/interviews/index.html',
        content: content
      });
    }
  }
}

module.exports = Interview;
