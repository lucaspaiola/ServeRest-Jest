const joi = require('joi')
const dotenv = require('dotenv')
const { deleteUser, createUser } = require('../../utils/functions')

const schemas = require('schemas/usuarios/schema-get-usuarios')
const route = '/usuarios'

let resp
let user_id

describe('List users', () => {
  beforeAll(() => {
    dotenv.config() // setup environment variables

    // createUser() returns the user_id
    user_id = (createUser('First User', 'oneuser@gmail.com', 'StrongPass123', 'false'))

    if(!user_id) {
      throw new Error('Failed to create a new user')
    }
  })

  it('Validate success schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const params = {
      nome: 'First User',
      email: 'oneuser@gmail.com',
      password: 'StrongPass123',
      administrador: 'false',
      _id: user_id
    }

    resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
    joi.assert(resp.body, schemas.ok)
  })

  it('Validate success schema with no users' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const params = {
      _id: 'invalidUserId'
    }

    resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
    joi.assert(resp.body, schemas.okButNoUsers)
  })

  it('Validate error schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const params = {
      nome: 'First User',
      email: 'oneuser',
      password: 'StrongPass123',
      administrador: 'false',
      _id: user_id
    }

    resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
    joi.assert(resp.body, schemas.invalidEmail)
  })

  afterAll(() => {
    deleteUser(user_id)
  })
})
