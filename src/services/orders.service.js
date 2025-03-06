import Api from './api/api'

export const getNewOrderNo = async () => {
  const response = await Api.get(`/orders/new`)
  response.data.newOrderNo++
  return response.data
}

export const createOrder = async (order) => {
  const response = await Api.post(`/orders/create`, {...order})
  return response.data
}