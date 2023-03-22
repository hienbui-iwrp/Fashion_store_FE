import axios from 'axios'

export const apiBranchService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BRANCH_SERVICE_PROXY,
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
  baseURL: process.env.NEXT_PUBLIC_STAFF_SERVICE_PROXY,
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

export const bpelBranch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BPEL_BRANCH_PROXY,
  headers: {
    'Content-Type': 'text/xml',
    'Access-Control-Allow-Origin': '*',
  },
})

bpelBranch.interceptors.response.use(
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

export const bpelAccount = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BPEL_ACCOUNT_PROXY,
  headers: {
    'Content-Type': 'text/xml',
    'Access-Control-Allow-Origin': '*',
  },
})

bpelAccount.interceptors.response.use(
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

export const adminBff = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BPEL_ADMIN_BFF_PROXY,
  headers: {
    'Content-Type': 'application/xml',
    'Access-Control-Allow-Origin': '*',
  },
})

adminBff.interceptors.response.use(
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
