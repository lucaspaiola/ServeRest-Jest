const joi = require('joi')

const ok = joi.object({
  nome: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  administrador: joi.string().required(),
  _id: joi.string().required()
})

const invalidUserId = joi.object({
  message: joi.string().required()
})

module.exports = {
  ok,
  invalidUserId
}

