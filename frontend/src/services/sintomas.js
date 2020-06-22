import axios from 'axios'
const baseUrl = "/api/sintomas"

const getAll = (id, date) => {
    console.log (id)
    return axios.get(`${baseUrl}/${id}/${date}`).then(response => response.data)
    
  }
  
  /*const getOne = id => {
    return axios.get(`${baseUrl}/${id}`).then(response => response.data)
  }*/
  
  const create = (id, newObject) => {
    return axios.post(`${baseUrl}/${id}`, newObject).then(response => response.data)
  }
  
  const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
  }
  
  const deleteOne = id => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
  }
  
  export default {
    getAll,
    //getOne,
    create,
    update,
    deleteOne
  }