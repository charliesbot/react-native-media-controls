
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-native-media-controls.cjs.production.min.js')
} else {
  module.exports = require('./react-native-media-controls.cjs.development.js')
}
