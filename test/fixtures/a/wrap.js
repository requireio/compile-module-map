var ModuleMap = require('module-map')(__dirname)

ModuleMap(function(src) {
  return src.replace('REPLACEME', 'REPLACED')
})

module.exports = ModuleMap
