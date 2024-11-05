const dotenv = require('dotenv')
const { deleteUser, createUser } = require('../../utils/functions')

const route = '/usuarios'

let resp
let user_id

describe('Sign up users', () => {
  beforeAll(() => {
    dotenv.config() // setup environment variables
  })

  it('Validate status code 201' + tags.smoke, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'User Test',
      email: 'usertest@gmail.com',
      password: 'StrongPassword123@',
      administrador: 'false'
    }

    resp = await request(process.env.BASE_URL).post(route).set(headers).send(body)
    user_id = resp.body._id
    expect(resp.status).toBe(201)
  })

  it.each`
  field               |     expectedErrorMessage
  ${'nome'}           |     ${'nome não pode ficar em branco'}
  ${'email'}          |     ${'email não pode ficar em branco'}
  ${'password'}       |     ${'password não pode ficar em branco'}
  ${'administrador'}  |     ${"administrador deve ser 'true' ou 'false'"}
  `('Validate status code 400, $field missing in the body' + tags.functional, async ({ field, expectedErrorMessage}) => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: field === 'nome' ? '' : 'Usuario de Teste',
      email: field === 'email' ? '' : 'usuarioTestee@gmail.com',
      password: field === 'password' ? '' : 'SenhaForte123@',
      administrador: field === 'administrador' ? '' : 'false'
    }

    resp = await request(process.env.BASE_URL).post(route).set(headers).send(body)
    expect(resp.status).toBe(400)
    expect(resp.body[field]).toBe(expectedErrorMessage)
  })

  it.each`
  field               |     expectedErrorMessage
  ${'email'}          |     ${'email deve ser um email válido'}
  ${'administrador'}  |     ${"administrador deve ser 'true' ou 'false'"}
  `('Validate status code 400, invalid $field in the body' + tags.functional, async ({ field, expectedErrorMessage}) => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'Usuario de Teste',
      email: field === 'email' ? 'usuarioTesteegmail.com' : 'usuarioTestee@gmail.com',
      password: 'SenhaForte123@',
      administrador: field === 'administrador' ? 'invalid' : 'false'
    }

    resp = await request(process.env.BASE_URL).post(route).set(headers).send(body)
    expect(resp.status).toBe(400)
    expect(resp.body[field]).toBe(expectedErrorMessage)
  })

  it('Validate status code 405' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'Usuario de Teste',
      email: 'usuarioTestee@gmail.com',
      password: 'SenhaForte123@',
      administrador: 'false'
    }

    resp = await request(process.env.BASE_URL).patch(route).set(headers).send(body)
    expect(resp.status).toBe(405)
  })

  afterAll(async () => {
    deleteUser(user_id)
  })
})

describe('User already exists', () => {
  beforeAll(async () => {
    dotenv.config() // setup environment variables

    // createUser() returns the user_id of the created user
    user_id = createUser('UserName', 'newuser@gmail.com', 'StrongPassword123', 'false')
  })

  it('Validate status code 400, email already exists' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'UserName',
      email: 'newuser@gmail.com',
      password: 'StrongPassword123',
      administrador: 'false'
    }

    resp = await request(process.env.BASE_URL).post(route).set(headers).send(body)
    expect(resp.status).toBe(400)
    expect(resp.body.message).toBe('Este email já está sendo usado')
  })

  afterAll(async () => {
    // deletes the created user
    deleteUser(user_id)
  })
})
