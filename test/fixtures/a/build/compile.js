var ModuleMap = require('module-map')(__dirname)
var path = require('path')
var fs = require('fs')
var sh = require('shelljs')
var TmpDir = require('quick-tmp')('compile-module-map')
var spawn = require('child_process').spawn

// copy dir
// kill
// rerun with doreplace env var set
// if doreplace replace original file with compiled
var env = process.env
var BUILD_DIR = __dirname + '/build'
var TMP_BUILD_DIR = TmpDir()
var DIR = __dirname
var MAP_REPLACE = env.MAP_REPLACE

MAP_REPLACE ? replace() : prepare()

function prepare() {
  sh.rm('-rf', BUILD_DIR)
  sh.rm('-rf', TMP_BUILD_DIR)
  sh.cp('-R', DIR + '/*', TMP_BUILD_DIR)
  sh.mv(TMP_BUILD_DIR, BUILD_DIR)
  spawn(process.execPath, ['./compile.js'], {
    cwd: BUILD_DIR,
    stdio: 'inherit',
    env: {
      MAP_REPLACE: 1
    }
  }).on('close', function(errCode) {
    process.exit(errCode)
  })
}

function replace() {
  ModuleMap(function(src) {
    return src.replace('REPLACEME', 'REPLACED')
  })

  ModuleMap.after(function(src, filename) {
    console.log(arguments)
    fs.writeFileSync(filename, src)
    return src
  })


  require('./index.js')
}
