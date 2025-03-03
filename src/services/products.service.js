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
  return response.data
}

export const getProductAndAnalogs = async (lang, id) => {
  const response = await Api.get(`/products`,
    {
      headers: { 'accept-language': lang },
      params: {
        id: id
      }
    })
  response.data[0].origin = true
  const params = {
    [`name_${lang}`]: response.data[0][`name_${lang}`],
    categoryId: response.data[0].categoryId,
  }
  const analogs = await getProducts(lang, {...params})
  const temp = analogs.filter((item) => {
    item.origin = false
    return item.id !== response.data[0].id
  })
  return [...response.data, ...temp]
}

export const increaseCounter = async (id, token) => {
  const response = await Api.put(`/products/counter/${id}`, {token: token})
  return response.data
}