const joi = require('joi')
const dotenv = require('dotenv')
const schemas = require('schemas/usuarios/schema-delete-usuarios')
const { createUser } = require('../../utils/functions')

const route = '/usuarios/'

let resp
let user_id

describe('Delete users', () => {
  beforeAll( async () => {
    dotenv.config() // setup environment variables

    // createUser() returns the user_id of the created user
    user_id = createUser('Should be deleted', 'shouldbedeleted@hotmail.com', 'NoPassword123', 'false')

    if (!user_id) {
      throw new Error('Failed to create a new user');
    }
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
