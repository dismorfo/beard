const path = require('path')
const server = require('node-http-server')
const appBuildDir = '/Users/albertoortiz/tools/beard/build'
const logFile = '/Users/albertoortiz/tools/beard/app/logs/request.log'

function serverReady (server) {
  //agartha.notifier.notify({
    //title: 'Agartha',
    //message: `Server on port ${server.config.port} is now up`
  //})
  console.log(`Server on port ${server.config.port} is now up`)
}

server.deploy({
  port: 8080, 
  root: appBuildDir, 
  verbose: false, 
  log: logFile 
}, serverReady)
