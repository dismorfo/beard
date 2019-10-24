'use strict';

const Subjects = class {

  get command () {
    return 'subjects';
  }

  get alias () {
    return 'ss';
  }

  get description () {
    return 'Clean subjects document';
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

  action () {
    const agartha = process.agartha;
    const appDir = agartha.appDir();
    const path = agartha.path;
    const subjectsPath = path.join(appDir, 'app/localsource/subjects.json');
    const fs = require('fs');
    const csv = require('fast-csv');
    const csvStream = fs.createReadStream(path.join(appDir, 'app/localsource/se-to-noid-mapping.csv'));
    let sdata = {}
    agartha.log(this.description(), 'ok');    
    csv.fromStream(csvStream)
      .on('data', function (data) {
        sdata[data[0]] = data[1]
    })
    .on('end', function() {
      try {
        if (agartha.exists(subjectsPath)) {
          const datasource = agartha.read.json(subjectsPath);
          console.log(sdata)
          agartha._.each(datasource.response.docs, (document) => {
            let id = document.name.toLowerCase().toLowerCase().replace(/ /g, '-');
            const filename = path.join(appDir, 'app/localsource/subjects', id + '.json');
            agartha._.each(document.interviews, (interview, index) => {
              document.interviews[index].noid = sdata[interview.identifier]
            });
            agartha.write(filename, JSON.stringify(document, null, 2));
          });
        }
      } 
      catch (e) {
        console.log(e);
        agartha.exit(e);
      }
    });
  }
}

module.exports = exports = Subjects;
