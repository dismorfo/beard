'use strict'

module.exports = exports = {
  id: 'home',
  title: 'Home',
  route: '/index.html',
  menu: [
    {
      context: 'navbar',
      label: 'Home',
      weight: 1
    }
  ],
  content: {
    main: {
      title : 'Welcome to Voices From The Food Revolution',
      localsource: 'content.main.html'
    }
  },
  assets: {
    js: []
  }
}
