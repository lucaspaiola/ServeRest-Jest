const request = require('supertest')
const tags = require('../utils/tags')

global.request = request
global.tags = tags
