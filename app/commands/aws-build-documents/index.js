'use strict';

const AwsBuildDocuments = class {

  get command () {
    return 'aws-build-documents';
  }

  get alias () {
    return false;
  }

  get description () {
    return 'Build CloudSearch search documents';
  }

  get options () {
    return [];
  }

  get onInit () {
    return false;
  }

  get onDone () {
    return false;
  }

  get list () {
    return true;
  }

  action () {
    const { 
      resolve, 
      parse 
    } = require('path');
    const _ = require('underscore');
    const {
      appDir,
      appUrl,
      exists,
      exit,
      log, mkdir,
      read,
      write
    } = require('hephaestus');
    try {
      let __documents = {
        value: []
      };

      const datasource = resolve(appDir(), 'app/localsource/subjects.json');
      if (exists(datasource)) {
        const source = read.json(datasource);
        const documentsPath = resolve(appDir(), 'app/localsource/discovery-index-documents');
        const transcriptsDir = resolve(appDir(), 'app/pages/interview/transcripts');
        if (exists(documentsPath)) {
          mkdir(documentsPath);
        }
        _.each(_.sortBy(source.response.docs, 'sort'), async (document, i) => {
          const id = `${document.name.replace(/ /g, '-').toLowerCase()}`;
          let content = document.bio;
          await document.interviews.map( async (interview) => {
            // transcript where converted to TXT using textutil
            // See: $ textutil -convert txt *.doc*
            const parseFilename = parse(interview.transcript.filename);
            content += read.text(`${transcriptsDir}/${parseFilename.name}.txt`);
          });
          let data = {
            type: 'add',
            id: id,
            fields: { 
              identifier: id,
              url: `${appUrl()}/interviews/${id}/index.html`,
              label: document.name,
              description: document.bio,
              body: document.bio,
              sort: document.sort.toLowerCase(),
              content: content
            }
          };
          await write(`${documentsPath}/${id}.json`, JSON.stringify(data));
        });
      }
    } catch (error) {
      console.log(error);
      exit(error);
    }
  }
};

module.exports = exports = AwsBuildDocuments;
