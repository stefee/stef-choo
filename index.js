var choo = require('choo')
var css = require('sheetify')

css('sanitize.css')
css('./scss/_index.scss')

var app = choo()

if (process.env.NODE_ENV === 'development') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
  app.use(require('choo-service-worker/clear')())
}
app.use(require('choo-service-worker')())

app.use(staticHost)
app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app

function staticHost (state) {
  state.staticHost = {
    base: 'http://static.stef.sh'
  }
}
