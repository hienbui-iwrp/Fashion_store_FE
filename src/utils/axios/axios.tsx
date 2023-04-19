import axios from 'axios'

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

export const adminBff = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_BFF_PROXY,
  headers: {
    'Content-Type': 'application/xml',
    'Access-Control-Allow-Origin': '*',
  },
})
if (typeof window !== 'undefined') {
  adminBff.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`
}

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

export const shareBff = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SHARE_BFF_PROXY,
  headers: {
    'Content-Type': 'application/xml',
    'Access-Control-Allow-Origin': '*',
  },
})

export const shareBpel = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SHARE_BFF_PROXY,
  headers: {
    'Content-Type': 'text/xml',
    'Access-Control-Allow-Origin': '*',
  },
})

export const customerBff = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CUSTOMER_BFF_PROXY,
  headers: {
    'Content-Type': 'application/xml',
    'Access-Control-Allow-Origin': '*',
  },
})
if (typeof window !== 'undefined') {
  customerBff.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`
}

export const shareBffCheckWh = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BFF_PROXY_CHECK_WH,
  headers: {
    'Content-Type': 'text/xml',
    'Access-Control-Allow-Origin': '*',
  },
})
