import axios from 'axios'
const baseUrl = 'https://young-hollows-35414.herokuapp.com/api/sintomas'
//const baseUrl = 'http://192.168.0.13:3001/api/sintomas'


async function getAll(id) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

async function create(id, newObject) {
  const response = await axios.post(`${baseUrl}/${id}`, newObject);
  return response.data;
}

export default {
  getAll,
  create,
}