var template = `
  <div>
    <h1><a v-bind:href="document.url" v-html="document.label"></a></h1>
    <div class="content" v-html="document.ts_bio"></div>
  </div>
`

Vue.component('document-item', { props: ['document'], template: template })

new Vue({        
  el: '#app',        
  data: {
    documents : []
  },
  created: function () {
    this.fetchDocuments()
  },
  methods: {
    fetchDocuments: function () {
      var vm = this
      const client = new createClient({
        host: 'mediacommons.local',
        port: 8983,
        protocol: 'http',
        path: '/solr/mediacommons',
      })  
      const q = client.getParameterByName('q')
      const query = client.createQuery() 
                     .q(q)
                     .start(0)
                     .rows(10)
      client.search(query, function (response) {
        const documents = response.data.response.docs
        documents.map(function (document) {
          vm.documents.push(document)
          console.log(document)
        })
      })
    }
  }
})
