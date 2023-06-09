import axios from 'axios'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const baseUrl = 'api/book' 

const getAllBooks = (body) => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

export default { getAllBooks }