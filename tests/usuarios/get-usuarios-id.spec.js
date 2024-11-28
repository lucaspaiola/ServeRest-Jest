const dotenv = require('dotenv')
const { deleteUser, createUser } = require('../../utils/functions')

const route = '/usuarios'

let resp
let user_id

describe('Get users searching by id', () => {
  beforeAll(async () => {
    dotenv.config() // setup environment variables

    // createUser() returns the user_id
    user_id = await createUser('First User', 'randomUserYesNoOk@gmail.com', 'StrongPass123', 'false')

    if(!user_id) {
      throw new Error('Failed to create a new user')
    }
  })

  it('Validate status code 200' + tags.smoke, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).get(route + '/' + `${user_id}`).set(headers)
    expect(resp.status).toBe(200)
  })

  it('Validate status code 400, invalid user_id' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).get(route + '/invalid').set(headers)
    expect(resp.status).toBe(400)
  })

  it('Validate status code 405' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const params = {
      nome: 'First User',
      email: 'oneuser@gmail.com',
      password: 'StrongPass123',
      administrador: 'false',
      _id: user_id[0]
    }

    resp = await request(process.env.BASE_URL).patch(route).set(headers).query(params)
    expect(resp.status).toBe(405)
  })

  afterAll(async () => {
    await deleteUser(user_id)
  })
})