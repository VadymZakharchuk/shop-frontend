import Api from './api/api'

export const listFavs = async (userId) => {
  const response = await Api.get(`/favourites`, {params: {userId: userId }})
  return response.data
}

export const addFav = async (body) => {
  const response = await Api.post(`/favourites`, {...body})
  return response.data
}
export const removeFav = async (body) => {
  const response = await Api.delete(`/favourites`, {...body})
  return response.data
}