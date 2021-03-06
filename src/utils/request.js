import axios from 'axios'
import {getToken, removeToken} from '@/utils/auth'
const http = axios.create({
  timeout: 5000
})

http.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Token'] = JSON.parse(getToken())['token']
    }
    return config
  },
  error => {
    console(error)
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    if (response.data.errno === 2) {
      removeToken()
      console.log(this.$store)
      this.$message({
        message: 'Token has expired Please reLogin!',
        type: 'warning'
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default http
