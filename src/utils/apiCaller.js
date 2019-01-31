import axios from 'axios'
const API_URL = "https://5c3ed0cec27832001404e292.mockapi.io/";

export default function callApi(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${API_URL}/${endpoint}`,
    data: body
  }).catch(err => console.log(err))
}