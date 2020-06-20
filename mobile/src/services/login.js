const baseUrl = 'https://young-hollows-35414.herokuapp.com/api/login'

async function login(credentials) {
  const response = await fetch(`${baseUrl}/paciente`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
  return response.json()
}

export default {
  login
}