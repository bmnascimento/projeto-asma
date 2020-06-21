import axios from 'axios'
const baseUrl = 'https://young-hollows-35414.herokuapp.com/api/login'
//const baseUrl = 'http://192.168.0.13:3001/api/login'

async function login(credentials) {
  const response = await axios.post(`${baseUrl}/paciente`, credentials);
  return response.data;
}

export default {
  login
}