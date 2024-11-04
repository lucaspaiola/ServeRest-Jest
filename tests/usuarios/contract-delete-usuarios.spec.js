const joi = require('joi')
const dotenv = require('dotenv')
const schemas = require('schemas/usuarios/schema-delete-usuarios')

const route = '/usuarios/'

let resp
let user_id

describe('Delete users', () => {
  beforeAll( async () => {
    dotenv.config() // setup environment variables

    // create a user
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'Should be deleted',
      email: 'deleteuser@gmail.com',
      password: 'SenhaForte123@',
      administrador: 'false'
    }

    resp = await request(process.env.BASE_URL).post('/usuarios').set(headers).send(body)
    user_id = resp.body._id
  })

  it('Validate success schema ' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).delete(route + user_id).set(headers)
    joi.assert(resp.body, schemas.ok)
  })

  it('Validate error schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).patch(route + user_id).set(headers)
    joi.assert(resp.body, schemas.badRequest)
  })


})
