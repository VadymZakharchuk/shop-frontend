import Api from './api/api'

export const login = async () => {
  const response = await Api.post(`/login`)
  return response.data
}
