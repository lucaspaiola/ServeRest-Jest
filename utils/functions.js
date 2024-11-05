// creates a new user and return the user_id
async function createUser(name, email, password, administrator) {
  const headers = {
    'Content-Type': 'application/json'
  }

  const body = {
    nome: name,
    email: email,
    password: password,
    administrador: administrator
  }

  resp = await request(process.env.BASE_URL).post('/usuarios').set(headers).send(body)
  return resp.body._id
}

// delete an user given the user_id
async function deleteUser (user_id) { 
  const headers = {
    'Content-Type': 'application/json'
  }

  if(user_id) {
    resp = await request(process.env.BASE_URL).delete(`/usuarios/${user_id}`).set(headers)
  }
}

module.exports = {
  createUser,
  deleteUser
}