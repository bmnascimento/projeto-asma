const baseUrl = 'https://young-hollows-35414.herokuapp.com/api/patients'

const getData = async (id, date) => {
  const response = await fetch(`${baseUrl}/data/${id}/${formatDate(date)}`)
  return response.json()
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
  getData,
}
