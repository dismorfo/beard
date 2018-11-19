function interviews (data) {
  'use strict'
  const agartha = process.agartha
  const datasource = agartha.path.join(agartha.appDir(), 'app/localsource/subjects.json')
  const defaultData = {
    id: 'interviews',
    title: 'Interviews',
    route: '/interviews/index.html',
    menu: [
      {
        context: 'navbar',
        label: 'Interviews',
        weight: 3
      }
    ],
    assets: {
      js: []
    }
  }
  agartha._.extend(data, defaultData) 
  data.content = {}
  data.content.main = {}
  data.content.main.title = 'Browse all interviews'
  data.content.main.interviewee = []  
  if (agartha.exists(datasource)) {
    const source = agartha.read.json(datasource)
    agartha._.each(source.response.docs, (document) => {
      let name = document.name.replace(' ', '-')
      data.content.main.interviewee.push({
        url: agartha.get('appUrl') + '/interviews/' + name.toLowerCase() + '/index.html',
        name: document.name,
        description: document.bio
      })
    })
    agartha.emit('task.done', data)
  }
}

module.exports = exports = interviews