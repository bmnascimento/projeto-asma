import axios from 'axios'
const baseUrl = 'https://young-hollows-35414.herokuapp.com/api/patients'
//const baseUrl = 'http://192.168.0.13:3001/api/patients'

const getOne = id => {
  return axios.get(`${baseUrl}/${id}`).then(response => response.data)
}

const getData = async (id, date) => {
  const response = await axios.get(`${baseUrl}/data/${id}/${formatDate(date)}`);
  return response.data;
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
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
  getOne,
  getData,
  update
}
