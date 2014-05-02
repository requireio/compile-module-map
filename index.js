var ModuleMap = require('module-map')(__dirname)
var path = require('path')
var fs = require('fs')
var sh = require('shelljs')
var spawn = require('child_process').spawn

var prepare = require('./lib/prepare')
var replace = require('./lib/replace')

module.exports = function(dir, fn) {
  prepare(dir, path.resolve(dir, 'build'), function(err, buildDir) {
    if (err) return fn(err)
    replace(buildDir, fn)
  })
}
