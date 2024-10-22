const joi = require('joi')
const dotenv = require('dotenv')

const schemas = require('schemas/usuarios/schema-post-usuarios')

const route = '/usuarios'

let resp

describe('Sign up users', () => {
  beforeAll(() => {
    dotenv.config() // setup environment variables
  })

  it('Validate success schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'Fulano de Teste',
      email: 'usuarioTestee@gmail.com',
      password: 'SenhaForte123@',
      administrador: 'false'
    }

    resp = await request(process.env.BASE_URL).post(route).set(headers).send(body)
    joi.assert(resp.body, schemas.ok)
  })

  it('Validate error schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      
    }

    resp = await request(process.env.BASE_URL).post(route).set(headers).send(body)
    joi.assert(resp.body, schemas.badRequest)
  })
})
