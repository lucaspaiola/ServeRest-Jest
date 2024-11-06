const dotenv = require('dotenv')
const { deleteUser, createUser } = require('../../utils/functions')

const route = '/usuarios'

let resp
const user_id = []

describe('List users', () => {
  beforeAll(() => {
    dotenv.config() // setup environment variables
  })

  describe('List one user', () => {
    beforeAll(() => {
      // createUser() returns the user_id
      user_id.push(createUser('First User', 'oneuser@gmail.com', 'StrongPass123', 'false'))

      if(!user_id[0]) {
        throw new Error('Failed to create a new user')
      }
    })

    it('Validate status code 200, search using nome' + tags.smoke, async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      const params = {
        nome: 'First User'
      }

      resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
      expect(resp.status).toBe(200)
    })

    it('Validate status code 200, search using email' + tags.functional, async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      const params = {
        email: 'oneuser@gmail.com'
      }

      resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
      expect(resp.status).toBe(200)
    })

    it('Validate status code 200, search using password' + tags.functional, async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      const params = {
        password: 'StrongPass123'
      }

      resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
      expect(resp.status).toBe(200)
    })

    it('Validate status code 200, search using administrador' + tags.functional, async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      const params = {
        administrador: 'false'
      }

      resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
      expect(resp.status).toBe(200)
    })

    it('Validate status code 200, search using _id' + tags.functional, async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      const params = {
        _id: user_id[0]
      }

      resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
      expect(resp.status).toBe(200)
    })

    it('Validate status code 400, invalid email' + tags.functional, async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      const params = {
        nome: 'First User',
        email: 'oneuser',
        password: 'StrongPass123',
        administrador: 'false',
        _id: user_id[0]
      }

      resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
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

    afterAll(() => {
      deleteUser(user_id.pop()) // pop() returns and remove the element from the array
    })
  })

  describe('List two or more users', () => {
    beforeAll(() => {
      user_id.push(createUser('John Doe', 'firstuser@gmail.com', 'StrongPass123', 'false'))
      user_id.push(createUser('John Doe', 'seconduser@hotmai.com', 'StrongPass123', 'false'))
      user_id.push(createUser('John Doe', 'thirduser@yahoo.com', 'StrongPass123', 'false'))
    })

    it('Validate status code 200, using no params' + tags.functional, async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      const params = { }

      resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
      expect(resp.status).toBe(200)
    })

    it('Validate status code 200, search using only nome' + tags.functional, async () => {
      const headers = {
        'Content-Type': 'application/json'
      }

      const params = {
        nome: 'John Doe',
        password: 'StrongPass123',
        administrador: 'false'
      }

      resp = await request(process.env.BASE_URL).get(route).set(headers).query(params)
      expect(resp.status).toBe(200)
      expect(resp.body.quantidade).toBeGreaterThan(2) // check if returns at least 3 users
    })

    afterAll(() => {
      for (i = 0; i < 3; i++) {
        deleteUser(user_id.pop())
      }
    })
  })
})