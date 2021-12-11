import axios from 'axios'
import { accessToken } from '../Redux/types/UserType'
// cấu hình interceptor (cấu hình sẵn những tham số mặc định cho tất cả api),
export const http = axios.create({
  baseURL: 'https://elearningnew.cybersoft.edu.vn',
  timeout: 30000 // thời gian nếu như load lâu sẽ out
})
http.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'TokenCybersoft': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjEyLzA0LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY0OTcyMTYwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjQ5ODY5MjAwfQ.RkFKrifGWTY3MP0bQtIpvA5WpWWrcSkGjDSw01LwhuI',
    'Authorization': 'Bearer ' + localStorage.getItem(accessToken),
  }
  return config
}, (errors) => {
  return Promise.reject(errors)
})