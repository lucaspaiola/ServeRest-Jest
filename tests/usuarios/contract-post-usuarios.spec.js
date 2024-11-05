const joi = require('joi')
const dotenv = require('dotenv')

const schemas = require('schemas/usuarios/schema-post-usuarios')
const { deleteUser } = require('../../utils/functions')

const route = '/usuarios'

let resp
let user_id

describe('Sign up users', () => {
  beforeAll(() => {
    dotenv.config() // setup environment variables
  })

  it('Validate success schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'User Test',
      email: 'usertest@hotmail.com',
      password: 'StrongPassword@123',
      administrador: 'false'
    }

    resp = await request(process.env.BASE_URL).post(route).set(headers).send(body)
    user_id = resp.body._id
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

  afterAll(() => {
    deleteUser(user_id)
  })
})
