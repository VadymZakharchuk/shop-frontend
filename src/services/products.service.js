import Api from './api/api'

export const getProducts = async (lang, params) => {
  const pars = {}

  if ('categoryId' in params) pars.categoryId = params.categoryId
  if ('limit' in params) pars.limit = params.limit
  if ('offset' in params) pars.offset = params.offset
  if ('size' in params) pars.size = params.size
  if ('colorId' in params) pars.colorId = params.colorId
  if ('is_new' in params) pars.is_new = params.is_new
  if ('name_uk' in params) pars.name_uk = params.name_uk
  if ('name_en' in params) pars.name_en = params.name_en
  const response = await Api.get(`/products`,
    {
      headers: { 'accept-language': lang },
      params: pars
    })
  return response.data
}

export const getProduct = async (lang, id) => {
  const response = await Api.get(`/products`,
    {
      headers: { 'accept-language': lang },
      params: {
        id: id
      }
    })
  return response.data[0]
}

export const increaseCounter = async (id, token) => {
  const response = await Api.put(`/products/counter/${id}`, {token: token})
  return response.data
}