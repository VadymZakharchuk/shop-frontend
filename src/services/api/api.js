import axios from 'axios'
import Cookies from 'js-cookie'

const API_DOMAIN = import.meta.env.VITE_API_URL

const Api = axios.create({
  baseURL: `${API_DOMAIN}`,
})

Api.interceptors.request.use(async (config) => {
  const token = Cookies.get('auth-token')
  if (token) config.headers.Authorization = token
  config.headers[`Content-Type`] = 'application/json'
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Accept'] = '*/*'

  return config
})

export default Api