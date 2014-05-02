var TmpDir = require('quick-tmp')('compile-module-map')
var sh = require('shelljs')
var exec = require('child_process').exec

module.exports = prepare

function prepare(source, target, fn) {
  var tmpTarget = TmpDir()
  sh.rm('-rf', source)
  sh.rm('-rf', tmpTarget)
  sh.cp('-R', source + '/*', tmpTarget)
  sh.mv(tmpTarget, target)
  fn(null, target)
}
