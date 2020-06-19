import axios from 'axios'
const baseUrl = '/api/patients'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const getOne = id => {
  return axios.get(`${baseUrl}/${id}`).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const deleteOne = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const getData = (id, date) => {
  return axios.get(`${baseUrl}/data/${id}/${formatDate(date)}`).then(response => response.data)
}

const formatDate = date => {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = date.getFullYear()

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day

  return [year, month, day].join('-')
}

export default {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  getData
}
