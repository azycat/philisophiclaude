import axios from 'axios'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

const baseUrl = 'api/claude' 

// const getAllActivities = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

const getNewActivity = () => { //test msg
  const request = axios.get(`${baseUrl}/new`)
  return request.then(response => response.data)
}
// book, history, currentLine, summary, user, message , msgHistory, 
const sendMessageToClaudeBook = (body) => {
  const request = axios.post(`../${baseUrl}/msgBook`, body);
  
  return request.then(response => {
    console.log('this got sent back from the backend', response)
    return response.data
  })
}

// const deleteAllActivities = () => {
//   const request = axios.get(`${baseUrl}/delete`)
//   return request.then(response => response.data)
// }
export default {  getNewActivity, sendMessageToClaudeBook }