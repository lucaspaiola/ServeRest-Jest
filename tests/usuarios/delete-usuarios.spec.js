const dotenv = require('dotenv')
const { createUser } = require('utils/functions')

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
