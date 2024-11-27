const dotenv = require('dotenv')
const { deleteUser, createUser } = require('../../utils/functions')
const joi = require('joi')

const route = '/usuarios'
const schemas = require('schemas/usuarios/schema-get-usuarios-id')

let resp
let user_id

describe('Get users searching by id', () => {
  beforeAll(async () => {
    dotenv.config() // setup environment variables

    // createUser() returns the user_id
    user_id = await createUser('First User', 'randomUserYesNoOkk@gmail.com', 'StrongPass123', 'false')

    if(!user_id) {
      throw new Error('Failed to create a new user')
    }
  })

  it('Validate success schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    console.log(user_id)

    resp = await request(process.env.BASE_URL).get(route + '/' + `${user_id}`).set(headers)
    joi.assert(resp.body, schemas.ok)
  })

  it('Validate error schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).get(route + '/invalid').set(headers)
    joi.assert(resp.body, schemas.invalidUserId)
  })

  afterAll(async () => {
    await deleteUser(user_id)
  })
})