const joi = require('joi')

const ok = joi.object({
  quantidade: joi.number().required(),
  usuarios: joi.array().items(joi.object({
    nome: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    administrador: joi.string().required(),
    _id: joi.string().required()
  }))
})

const okButNoUsers = joi.object({
  quantidade: joi.number().required(),
  usuarios: joi.array()
})

const invalidEmail = joi.object({
  email: joi.string().required()
})

module.exports = {
  ok,
  okButNoUsers,
  invalidEmail
}

