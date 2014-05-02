"use strict"

var fs = require('fs')
var test = require('tape')
var build = require('../')
var TmpDir = require('quick-tmp')('compile-module-map')

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
