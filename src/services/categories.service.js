import Api from './api/api'

export const getCategories = async () => {
  const response = await Api.get(`/categories`)
  return response.data
}
