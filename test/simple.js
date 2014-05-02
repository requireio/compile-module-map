"use strict"

var fs = require('fs')
var test = require('tape')
var dirname = require('path').dirname
var build = require('../')
var TmpDir = require('quick-tmp')('compile-module-map')
var spawn = require('child_process').spawn

test('will create clone of structure with replacements applied', function(t) {
  var tmpdir = TmpDir()
  build('./fixtures/a/', function(err) {
    t.ifError(err)
    var a = require('./fixtures/a/build')
    var b = require('./fixtures/a/build/b')
    t.equal(a, 'REPLACED')
    t.equal(b, 'REPLACED')
    t.end()
  })
})
