import Api from './api/api'

export const getProducts = async (lang, params) => {
  const pars = {}

  if ('categoryId' in params) pars.categoryId = params.categoryId
  if ('limit' in params) pars.limit = params.limit
  if ('offset' in params) pars.offset = params.offset
  if ('size' in params) pars.size = params.size
  if ('colorId' in params) pars.colorId = params.colorId
  const response = await Api.get(`/products`,
    {
      headers: { 'accept-language': lang },
      params: pars
    })
  return response.data
}
