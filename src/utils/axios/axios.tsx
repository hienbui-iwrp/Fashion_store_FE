import { HOST_BRANCH_SERVICE, HOST_STAFF_SERVICE } from '@/constants'
import axios from 'axios'

export const apiBranchService = axios.create({
  baseURL: process.env.BRANCH_SERVICE_URL ?? HOST_BRANCH_SERVICE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

// apiBranchService.defaults.headers.common['Authorization'] = 'Bearer '

apiBranchService.interceptors.response.use(
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

export const apiStaffService = axios.create({
  baseURL: process.env.STAFF_SERVICE_URL ?? HOST_STAFF_SERVICE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

apiStaffService.interceptors.response.use(
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

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

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
