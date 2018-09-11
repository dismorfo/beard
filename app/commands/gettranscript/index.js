'use strict'

const GetTranscript = class {
  get command () {
    return 'gettranscript'
  }
  get alias () {
    return 'gt'
  }
  get description () {
    return 'Get transcript'
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
    try {
      const datasource = agartha.path.join(agartha.appDir(), 'app/localsource/subjects.json')
      if (agartha.exists(datasource)) {
        const source = agartha.read.json(datasource)
        const transcriptsDir = agartha.path.join(agartha.appDir(), 'app/pages/interview/transcripts')
        agartha.mkdir(transcriptsDir)
        agartha._.each(source.response.docs, (document) => {
          agartha._.each(document.interviews, (interview) => {
            agartha.request(interview.transcript.uri).pipe(agartha.fs.createWriteStream(agartha.path.join(transcriptsDir, agartha.path.basename(interview.transcript.uri))))
          })
        })  
      }
    } catch (e) {
      console.log(e)
      agartha.exit(e)
    }
  }
}

module.exports = exports = GetTranscript
