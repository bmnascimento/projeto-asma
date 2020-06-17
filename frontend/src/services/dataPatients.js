import axios from 'axios'

const getData = (fitbitId, date, accessToken) => {
  return axios.get(`https://api.fitbit.com/1/user/${fitbitId}/activities/date/${date}.json`, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }).then(response => response.data)
}

const refreshToken = (id) => {
  return axios.post(`/api/patients/refresh/${id}`).then(response => response.data)
}

export default {
  getData,
  refreshToken
}