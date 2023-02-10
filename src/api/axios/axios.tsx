import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

// const jwtKey = localStorage.getItem('jwtKey')
//   ? String(localStorage.getItem('jwtKey'))
//   : ' '

api.defaults.headers.common['Authorization'] = 'Bearer '

//temporary fix for login error
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.warn('Error status', error.response?.status)
    console.log('show notification')
    console.log(error.response?.data)
    return Promise.reject(error)
  }
)
