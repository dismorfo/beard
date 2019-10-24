'use strict';

const {
  appUrl,
  server
} = require('hephaestus');
const testServer = server();
const testServerUrl = appUrl();
const request = require('request');

module.exports = {
  tags: ['beard'],
  '@disabled': false,

  before: () => {
    console.log('[notice]: Test Suite - Voices from the Food Revolution');
    console.log(`[notice]: Test server URL ${testServerUrl}`);
    testServer.listen(8080);  
  },
  
  'Homepage': client => {
    client
      .url(testServerUrl)
      .pause(1000);
    client.expect.element('body').to.be.present;
    client.assert.containsText('#content h1.title', 'Welcome to Voices From The Food Revolution');
    client.end();
  },

  'Interviews': client => {
    client
      .url(`${testServerUrl}/interviews/index.html`)
      .pause(1000);
    client.expect.element('body').to.be.present;
    client.elements('css selector', '.views-row a', result => {
      result.value.map(node => {
        client.elementIdAttribute(node.ELEMENT, 'href', link => {
          request(link.value, (error, response) => {
            client.assert.equal(response.statusCode, 200, `${link.value} available.`);
          });
        });
      });
    });
    client.end();
  },

  'Interviews page': client => {

    const pages = [
      {
        label: 'Hilary Baum',
        url: 'interviews/hilary-baum/index.html'
      },
      {
        label: 'Barry Benepe',
        url: 'interviews/barry-benepe/index.html'
      },
      {
        label: 'John Ferrone',
        url: 'interviews/john-ferrone/index.html'
      },
      {
        label: 'Betty Fussell',
        url: 'interviews/betty-fussell/index.html'
      },
      {
        label: 'Gael Greene',
        url: 'interviews/gael-greene/index.html'
      },
      {
        label: 'Judith Jones',
        url: 'interviews/judith-jones/index.html'
      },
      {
        label: 'Marion Nestle',
        url: 'interviews/marion-nestle/index.html'
      },
      {
        label: 'Jacques Pepin',
        url: 'interviews/jacques-pepin/index.html'
      },
      {
        label: 'Irene Sax',
        url: 'interviews/irene-sax/index.html'
      },
      {
        label: 'Mimi Sheraton',
        url: 'interviews/mimi-sheraton/index.html'
      },
      {
        label: 'Clark Wolf',
        url: 'interviews/clark-wolf/index.html'
      },
      {
        label: 'Dan Barber',
        url: 'interviews/dan-barber/index.html'
      },
      {
        label: 'Lidia Bastianich',
        url: 'interviews/lidia-bastianich/index.html'
      },
      {
        label: 'Ariane Batterberry',
        url: 'interviews/ariane-batterberry/index.html'
      },
      {
        label: 'Michael Batterberry',
        url: 'interviews/michael-batterberry/index.html'
      },
      {
        label: 'Dalia Carmel',
        url: 'interviews/dalia-carmel/index.html'
      },
      {
        label: 'Tom Colicchio',
        url: 'interviews/tom-colicchio/index.html'
      },
      {
        label: 'Mark Federman',
        url: 'interviews/mark-federman/index.html'
      },
      {
        label: 'Dan Imhoff',
        url: 'interviews/dan-imhoff/index.html'
      },
      {
        label: 'Madhur Jaffrey',
        url: 'interviews/madhur-jaffrey/index.html'
      },
      {
        label: 'Barbara Kafka',
        url: 'interviews/barbara-kafka/index.html'
      },
      {
        label: 'Reese Schonfeld',
        url: 'interviews/reese-schonfeld/index.html'
      },
      {
        label: 'Gus Schumacher',
        url: 'interviews/gus-schumacher/index.html'
      },
      {
        label: 'Michael Whiteman',
        url: 'interviews/michael-whiteman/index.html'
      },
      {
        label: 'Jane White Viazzi',
        url: 'interviews/jane-white-viazzi/index.html'
      },
      {
        label: 'Nina Zagat',
        url: 'interviews/nina-zagat/index.html'
      },
      {
        label: 'Tim Zagat',
        url: 'interviews/tim-zagat/index.html'
      },                 
    ];

    for (let page of pages) {
      client.url(`${testServerUrl}/${page.url}`).pause(1000);
      client.expect.element('#page-title').to.be.present;
      client.assert.containsText('#content h1.title', page.label);
    }
  
  },

  after: () => {
    testServer.close();
  }

};
