var ModuleMap = require('module-map')

ModuleMap.after(function(src, filename) {
  fs.writeFileSync(filename, src)
  return src
})
