import Api from './api/api'

export const getProducts = async (lang, limit, offset) => {
  const response = await Api.get(`/products`,
    {
      headers: { 'Accept-Language': lang },
      params: {
        limit: limit,
        offset: offset
      }
    })
  return response.data
}
