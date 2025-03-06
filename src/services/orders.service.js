import Api from './api/api'

export const getNewOrderNo = async () => {
  const response = await Api.get(`/orders/new`)
  response.data.newOrderNo++
  return response.data
}
