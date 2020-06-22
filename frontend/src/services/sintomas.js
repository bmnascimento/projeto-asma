import axios from 'axios'
const baseUrl = '/api/sintomas'

const getAll = (id) => {
  return axios.get(`${baseUrl}/${id}`).then(response => response.data)
}

export default {
  getAll,
}