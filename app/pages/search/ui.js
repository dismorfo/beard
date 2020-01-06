new Vue({
  el: '#app',
  data: function () {
    return {
      q: null,
      label: 'Searching term <span class="loading"><span>.</span><span>.</span><span>.</span></span>',
      documents: [],
      rows: 10,
      start: 0,
      discovery: '',
      isBusy: true,
    };
  },
  mounted: function () {
    this.rows = this.$el.getAttribute('data-rows');
    this.start = this.$el.getAttribute('data-start');
    this.discovery = this.$el.getAttribute('data-discovery');
    this.q = this.getParameterByName('q');
    if (this.q) {
      this.fetchDocuments();
    }
    else {
      this.label = 'Please provide search term.';
    }
  },
  computed: {
    hasDocuments: function() {
      return this.documents.length > 0;
    }
  },
  methods: {
    getParameterByName: function (name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    fetchDocuments: function () {
      const vm = this;

      const discovery = 'https://dlts-discovery.search.windows.net/indexes/beard-basic-search/docs'

        fetch(
          `${discovery}?search="${this.q}"&api-version=2019-05-06&$count=true`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'api-key': '6034DAD74C87480901F555C8616499DF'
            },            
          }
        ).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          const documents = data.value;
          if (documents.length > 0) {
            documents.map(document => {
              vm.documents.push(document);
            });
          } else {
            vm.label = `Sorry, no results for "<em class="q">${vm.q}</em>"`;
          }
        })
        .finally(() => {
          this.isBusy = false;
        })
        .catch((error) => {
          console.log('Looks like there was a problem: \n', error);
        });
    }
  }
});
