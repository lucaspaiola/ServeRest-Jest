const joi = require('joi')

const ok200 = joi.object({
  message: joi.string().required()
})

const ok201 = joi.object({
  message: joi.string().required(),
  _id: joi.string().required()
})

const existedEmail = joi.object({
  message: joi.string().required()
})

const badRequest = joi.object({
  nome: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  administrador: joi.string().required()
})

module.exports = {
  ok200,
  ok201,
  existedEmail,
  badRequest
}
