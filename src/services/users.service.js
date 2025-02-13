import Api from './api/api'

export const login = async (body) => {
  const response = await Api.post(`/users/login`, {...body})
  return response.data
}
