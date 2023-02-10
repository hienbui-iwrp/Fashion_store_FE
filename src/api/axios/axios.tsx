import { HOST_BRANCH_SERVICE } from '@/constants'
import axios from 'axios'

const apiBranchService = axios.create({
  baseURL: HOST_BRANCH_SERVICE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

// apiBranchService.defaults.headers.common['Authorization'] = 'Bearer '

// //temporary fix for login error
// apiBranchService.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     console.warn('Error status', error.response?.status)
//     console.log('show notification')
//     console.log(error.response?.data)
//     return Promise.reject(error)
//   }
// )

export { apiBranchService }
