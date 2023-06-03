import axios from 'axios'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const baseUrl = 'api/book' 

const getBook = (body) => {
  const request = axios.get(`${baseUrl}`)
  return request.then(response => response.data)
}

export default {  getBook }