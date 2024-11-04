const dotenv = require('dotenv')

const route = '/usuarios/'

let resp
let user_id

describe('Delete users', () => {
  beforeAll( async () => {
    dotenv.config() // setup environment variables

    // create an user
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

    if (!user_id) {
      throw new Error('Failed to create a new user');
    }
  })

  it('Validate status code 200' + tags.smoke, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).delete(route + user_id).set(headers)
    expect(resp.status).toBe(200)
  })

  it('Validate status code 200, invalid user_id' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).delete(route + 'invalid').set(headers)
    expect(resp.status).toBe(200)
    expect(resp.body.message).toBe('Nenhum registro excluído')
  })

  it('Validate status code 405' + tags.functional, async () => {
    const headers = {
      'Content-Type': 'application/json'
    }

    resp = await request(process.env.BASE_URL).patch(route + user_id).set(headers)
    expect(resp.status).toBe(405)
  })
})
