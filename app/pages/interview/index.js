'use strict';

const { appBuildDir, appDir, copy, exists, get, Page, read, readdirSync } = require('hephaestus');
const { resolve } = require('path');
const _ = require('underscore');

module.exports = class Interview extends Page {
  init () {
    const appUrl = get('appUrl');
    const provider = get('BEARD_PROVIDER');
    const subjectsPath = resolve(appDir(), 'app/localsource/subjects');
    copy(
      resolve(appDir(), 'app/pages/interview/transcripts'), 
      resolve(appBuildDir(), 'transcripts'), error => {
        if (error) {
          return console.error(error);
        }
      }
    );
    _.each(readdirSync(subjectsPath), filename => {
      const filepath = resolve(subjectsPath, filename);
      if (exists(filepath)) {
        const document = read.json(filepath);
        const title = `Interview - ${document.name}`;
        const id = document.name.toLowerCase().toLowerCase().replace(/ /g, '-');
        const route = `interviews/${id}/index.html`;
        let content = {
          main: {
            title: document.name,
            description: document.bio,
            interviews: []
          }
        };
        _.each(document.interviews, interview => {
          const identifier = interview.identifier.toLowerCase().replace(/_/g, '-');       
          content.main.interviews.push({
            transcript: interview.transcript.uri,
            identifier: identifier,
            url: `${appUrl}/${route}/${identifier}/index.html`,
            title: interview.title,
            handle: interview.handle,
            date: interview.date,
            embed: `${provider}/playlists/${interview.noid}/mode/embed`,
          });
        });
        this.render({ id: id, title: title, route: route, content: content });
      }
    });
  }
}
