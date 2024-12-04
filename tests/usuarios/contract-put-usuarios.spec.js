const joi = require('joi')
const dotenv = require('dotenv')
const { deleteUser, createUser } = require('../../utils/functions')
const schemas = require('schemas/usuarios/schema-put-usuarios')

const route = '/usuarios'

let resp
const user_id = []

describe('Edit user by id', () => {
  beforeAll(async () => {
    dotenv.config() // setup environment variables
  })

  beforeEach(async () => {
    // createUser() returns the user_id
    user_id.push(await createUser('Jane Doe', 'contracteditUserByID@gmail.com', 'StrongPass123', 'false'))

    if(!user_id[0]) {
      throw new Error('Failed to create a new user')
    }
  })

  it('Validate success schema' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'John Doe',
      email: 'contracteditEmail@hotmailyahoo.com',
      password: 'teste',
      administrador: 'true'
    }

    resp = await request(process.env.BASE_URL).put(route + '/' + `${user_id[0]}`).set(headers).send(body)
    joi.assert(resp.body, schemas.ok200)
  })

  it('Validate success schema code 201, invalid userId but valid email' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'John Doe',
      email: 'contractnewuseremail@hotmailyahoo.com',
      password: 'teste',
      administrador: 'true'
    }

    resp = await request(process.env.BASE_URL).put(route + '/invalid').set(headers).send(body)
    user_id.push(resp.body._id)
    joi.assert(resp.body, schemas.ok201)
  })

  it('Validate error schema status code 400, bad request' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      
    }

    resp = await request(process.env.BASE_URL).put(route + '/' + `${user_id[0]}`).set(headers).send(body)
    joi.assert(resp.body, schemas.badRequest)
  })

  it('Validate error schema status code 400, invalid user_id and existing email' + tags.contract, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'John Doe',
      email: 'contracteditUserByID@gmail.com',
      password: 'teste',
      administrador: 'true'
    }

    resp = await request(process.env.BASE_URL).put(route + '/invalid').set(headers).send(body)
    joi.assert(resp.body, schemas.existedEmail)
  })

  afterEach(async () => {
    while(user_id[0]) {
      await deleteUser(user_id.pop())
    }
  })
})