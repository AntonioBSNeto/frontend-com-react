import axios from 'axios'
import { store } from '../../redux/store'
import { logOut } from '../../redux/features/auth/authSlice'

const API_BASE_URL = 'https://api.escuelajs.co/api/v1'

const API = axios.create({
  baseURL: API_BASE_URL
})

API.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error?.response?.status === 401) {
      store.dispatch(logOut())
      localStorage.setItem('isTokenExpired', '1')
    }
    throw error
  }
)

export default API