'use strict'

const { agartha } = require('hephaestus');

module.exports = exports = class Interview extends agartha.Page {
  init () {
    // Hephaestus it's already present
    const he = this.hephaestus;    
    const appUrl = he.get('appUrl');
    const provider = he.get('BEARD_PROVIDER');
    const subjectsPath = he.path.join(he.appDir(), 'app/localsource/subjects');
    // copy transcripts files into public directory
    he.copy(
      he.path.join(he.appDir(), 'app/pages/interview/transcripts'), 
      he.path.join(he.appBuildDir(), 'transcripts'),
      (err) => {
        if (err) {
          return console.error(err);
        }
      }
    );
    he._.each(agartha.readdirSync(subjectsPath), (filename) => {
      const filepath = he.path.join(subjectsPath, filename);
      if (he.exists(filepath)) {
        const document = he.read.json(filepath);
        const title = 'Interview - ' + document.name;
        const id = document.name.toLowerCase().toLowerCase().replace(/ /g, '-');
        const route = 'interviews/' + id + '/index.html';
        let content = {
          main: {
            title: document.name,
            description: document.bio,
            interviews: []
          }
        };
        he._.each(document.interviews, (interview) => {
          const identifier = interview.identifier.toLowerCase().replace(/_/g, '-');       
          content.main.interviews.push({
            transcript: interview.transcript.uri,
            identifier: identifier,
            url: appUrl + '/' + route + '/' + identifier +  '/index.html',
            title: interview.title,
            handle: interview.handle,
            date: interview.date,
            embed: provider + '/playlists/' + interview.noid + '/mode/embed'
          });
        });
        // Pages need 'id' and 'route' properties
        this.render({
          id: id,
          title: title,
          route: route,
          content: content
        });
      }
    });
  }
}
