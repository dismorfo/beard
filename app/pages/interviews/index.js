function interviews (data) {
  'use strict'
  const agartha = process.agartha
  const datasource = agartha.path.join(agartha.appDir(), 'app/localsource/subjects.json')
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

exports.interviews = interviews
