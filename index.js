
const minimist = require('minimist')
const ARGS = minimist(process.argv.slice(2))
const protractorLauncher = require('protractor/built/launcher')
const path = require('path')
const seleniumHost = ARGS.selenium_host ? ARGS.selenium_host : 'localhost'
const seleniumPort = ARGS.selenium_port ? ARGS.selenium_port : '8888'
const appUrl = ARGS.app_url ? ARGS.app_url : 'http://localhost:5555/'

protractorLauncher.init(null, {
  seleniumAddress: `http://${seleniumHost}:${seleniumPort}/wd/hub` || `http://localhost:4444/wd/hub`,
  baseUrl: appUrl,
  specs: [path.join(__dirname, './specs/*.ts')]
})

