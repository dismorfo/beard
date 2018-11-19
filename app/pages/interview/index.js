function interview (data) {
  'use strict'
  const agartha = process.agartha
  const datasource = agartha.path.join(agartha.appDir(), 'app/localsource/subjects.json')
  agartha.copy(
    agartha.path.join(agartha.appDir(), 'app/pages/interview/transcripts'), 
    agartha.path.join(agartha.appBuildDir(), 'transcripts'),
    (err) => {
      if (err) {
        return console.error(err)
      }
  })
  const defaultData = {
    id: 'interview',
    title: 'Interviews',
    route: '/interviews/*',
    menu: [],
    content: {},
    assets: {
      js: []
    }
  }
  agartha._.extend(data, defaultData)  
  if (agartha.exists(datasource)) {
    const source = agartha.read.json(datasource)
    const docs = agartha._.sortBy(source.response.docs, 'sort')
    agartha._.each(docs, (document) => {
      let _route = 'interviews/' + document.name.toLowerCase().toLowerCase().replace(/ /g, '-')
      data.content.main = {}
      data.content.main.interviews = []
      data.route = _route +  '/index.html'
      data.content.main.title = document.name
      data.content.main.description = document.bio
      agartha._.each(document.interviews, (interview) => {
        const identifier = interview.identifier.toLowerCase().replace(/_/g, '-')        
        data.content.main.interviews.push({
          identifier: identifier,
          url: agartha.get('appUrl') + '/' + _route + '/' + identifier +  '/index.html',
          title: interview.title
        })
      })
      agartha.emit('task.done', data)
    })    
  }
}

module.exports = exports = interview

