const dotenv = require('dotenv')
const { deleteUser, createUser } = require('../../utils/functions')

const route = '/usuarios'

let resp
const user_id = []

describe('Edit user by id', () => {
  beforeAll(async () => {
    dotenv.config() // setup environment variables
  })

  beforeEach(async () => {
    // createUser() returns the user_id
    user_id.push(await createUser('Jane Doe', 'editUserByID@gmail.com', 'StrongPass123', 'false'))

    if(!user_id[0]) {
      throw new Error('Failed to create a new user')
    }
  })

  it('Validate status code 200' + tags.smoke, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'John Doe',
      email: 'editEmail@hotmailyahoo.com',
      password: 'teste',
      administrador: 'true'
    }

    resp = await request(process.env.BASE_URL).put(route + '/' + `${user_id[0]}`).set(headers).send(body)
    expect(resp.status).toBe(200)
  })

  it('Validate status code 201, invalid userId but valid email' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'John Doe',
      email: 'newuseremail@hotmailyahoo.com',
      password: 'teste',
      administrador: 'true'
    }

    resp = await request(process.env.BASE_URL).put(route + '/invalid').set(headers).send(body)
    user_id.push(resp.body._id)
    expect(resp.status).toBe(201)
  })

  it('Validate status code 400, bad request' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      
    }

    resp = await request(process.env.BASE_URL).put(route + '/' + `${user_id[0]}`).set(headers).send(body)
    expect(resp.status).toBe(400)
  })

  it('Validate status code 400, invalid user_id and existing email' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const body = {
      nome: 'John Doe',
      email: 'editUserByID@gmail.com',
      password: 'teste',
      administrador: 'true'
    }

    resp = await request(process.env.BASE_URL).put(route + '/invalid').set(headers).send(body)
    expect(resp.status).toBe(400)
  })

  it('Validate status code 405' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).patch(route).set(headers)
    expect(resp.status).toBe(405)
  })

  afterEach(async () => {
    while(user_id[0]) {
      console.log(user_id[0])
      await deleteUser(user_id.pop())
    }
  })
})