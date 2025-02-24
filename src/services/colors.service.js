import Api from './api/api'

export const getColors = async (params) => {
  const response = await Api.get(`/colors`, { ...params })
  // response.data.forEach(item => item.text = `${item.int.toUpperCase()} (${item.eu})`)
  return response.data
}
