import Api from './api/api'

export const getCategories = async (lang) => {
  const response = await Api.get(`/categories`, { headers: { 'Accept-Language': lang }})
  return response.data
}
