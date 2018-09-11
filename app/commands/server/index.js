'use strict'

const Server = class {
  get command () {
    return 'server'
  }
  get alias () {
    return 'ss'
  }
  get description () {
    return 'Server'
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
      const fs = require('fs')
      const path = require('path')
      const { spawn } = require('child_process')
      const appBuildDir = agartha.appBuildDir()
      const appDir = agartha.appDir()
      const app = `${appDir}/app/commands/server/server.js`
      const out = fs.openSync(`${appDir}/app/logs/out.log`, 'a')
      const err = fs.openSync(`${appDir}/app/logs/out.log`, 'a')
      spawn('node', [app], {
        stdio: [ 'ignore', out, err ],
        detached: true
     }).unref()
    } catch (e) {
      console.log(e)
      agartha.exit(e)
    }
  }
}

module.exports = exports = Server
