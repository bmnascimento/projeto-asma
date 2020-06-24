import axios from 'axios'
const baseUrl = '/api/sintomasSemanal'

const getAll = id => {
  return axios.get(`${baseUrl}/${id}`).then(response => response.data)
}

const create = (id, newObject) => {
  return axios.post(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default {
  getAll,
  create,
}
