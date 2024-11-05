const joi = require('joi')

const ok = joi.object({
  message: joi.string().required()
})

const badRequest = joi.object({
  message: joi.string().required()
})

module.exports = {
  ok,
  badRequest
}
