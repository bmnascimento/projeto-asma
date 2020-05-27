import axios from 'axios'
const baseUrl = '/api/patients/data'

const getData = (id, date) => {
  return axios.get(`${baseUrl}/${id}/${date}`).then(response => response.data)
}

export default {
  getData
}