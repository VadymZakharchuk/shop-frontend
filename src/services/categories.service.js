import Api from './api/api'

export const getCategories = async (id, lang) => {
  const params = id ? { id: id } : {}
  const response = await Api.get(`/categories`, {
    headers: { 'Accept-Language': lang },
    params: { ...params }
  })
  return response.data
}
