import Api from './api/api'

export const getProducts = async (lang, limit, offset) => {
  const response = await Api.get(`/products`,
    {
      headers: { 'accept-language': lang },
      params: {
        limit: limit,
        offset: offset
      }
    })
  return response.data
}
