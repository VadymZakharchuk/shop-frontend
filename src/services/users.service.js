import Api from './api/api'

export const login = async (body) => {
  const response = await Api.post(`/auth/login`, {...body})
  return response.data
}

export const register = async (body) => {
  const response = await Api.post(`/auth/signup`, {...body})
  return response.data
}
