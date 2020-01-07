'use strict';

const DiscoveryBuildDocuments = class {

  get command () {
    return 'discovery-build-documents';
  }

  get alias () {
    return false;
  }

  get description () {
    return 'Build search documents';
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
    const { resolve, parse } = require('path');
    const _ = require('underscore');
    const { appDir, appUrl, get, exists, exit, log, mkdir, read, write } = require('hephaestus');
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
            value: [
              {
                '@search.action': 'upload',
                DocumentId: id,
                label: document.name,
                entityPath: `${appUrl()}/interviews/${id}/index.html`,
                name: document.name,
                body: document.bio,
                sort: document.sort.toLowerCase(),
                handle: document.handle,
                content: content
              }
            ]
          };

          __documents.value.push({
            '@search.action': "upload",
            DocumentId: id,
            label: document.name,
            entityPath: `${appUrl()}/interviews/${id}/index.html`,
            name: document.name,
            body: document.bio,
            sort: document.sort.toLowerCase(),
            handle: document.handle,
            content: content
          });

          await write(`${documentsPath}/${id}.json`, JSON.stringify(data));

          if (i === 26) {
            await write(`${documentsPath}/discovery-index-documents.json`, JSON.stringify(__documents));
          }

        });

      }
    } catch (error) {
      log(error, error);
      exit(error);
    }
  }
};

module.exports = exports = DiscoveryBuildDocuments;
