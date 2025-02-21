import Api from './api/api'

export const getSizes = async () => {
  const response = await Api.get(`/sizes`)
  return response.data
}
