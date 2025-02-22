import Api from './api/api'

export const getSizes = async (params) => {
  const response = await Api.get(`/sizes`, { ...params })
  response.data.forEach(item => item.text = `${item.int.toUpperCase()} (${item.eu})`)
  return response.data
}
