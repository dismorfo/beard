'use strict'

const SolrClient = class {
  get command () {
    return 'solr-client'
  }
  get alias () {
    return 'sc'
  }
  get description () {
    return 'SolrClient'
  }
  get options () {
    return []
  }
  get onInit () {
    return false
  }
  get onDone () {
    return false
  }
  action () {
    const agartha = process.agartha
    var WordExtractor = require('word-extractor')
    const solr = require('solr-client')
    const path = require('path')
    const uuidv4 = require('uuid/v4')
    try {
      const datasource = path.join(agartha.appDir(), 'app/localsource/subjects.json')
      if (agartha.exists(datasource)) {
        const source = agartha.read.json(datasource)
        const transcriptsDir = path.join(agartha.appDir(), 'app/pages/interview/transcripts')
        const client = solr.createClient({
          host: 'mediacommons.local',
          port: 8983,
          path: '/solr/mediacommons',
          get_max_request_entity_size: 1000,
          autoCommit: true,
          solrVersion: '5.1'
         })  
        agartha._.each(source.response.docs, (document, index) => {
          const id = (index + 1).toString()
          agartha._.each(document.interviews, (interview) => {
            const extractor = new WordExtractor()
            const transcript = agartha.path.join(transcriptsDir, agartha.path.basename(interview.transcript.uri))
            const extracted = extractor.extract(transcript)
            extracted.then((doc) => {
              client.add({
                id : path.join(agartha.get('shortName'), id),
                url: agartha.appUrl() + '/interviews/' + document.name.toLowerCase().toLowerCase().replace(/ /g, '-') + '/index.html',
                label : document.name,
                hash: agartha.get('shortName'),
                content : document.bio + '' + doc.getBody(),
                ts_bio: document.bio,
                sort_name: document.sort
              }, (err, obj) => {
                if (err) {
                  console.log(err)
                }
                else {
                  console.log(obj)
                }
              })
            }).catch((err) => {
              console.log(err)
              console.log(transcript)
              client.add({
                id : path.join(agartha.get('shortName'), id),
                url: 'interviews/' + document.name.toLowerCase().toLowerCase().replace(/ /g, '-'),
                label : document.name,
                hash: agartha.get('shortName'),
                content : document.bio,
                ts_bio: document.bio,
                sort_name: document.sort
              }, (err, obj) => {
                if (err) {
                  console.log(err)
                }
                else {
                  console.log(obj)
                }
              })
          });
          })
        })  
      }
    } catch (e) {
      console.log(e)
      agartha.exit(e)
    }
  }
}

module.exports = exports = SolrClient
