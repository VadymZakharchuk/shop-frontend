import axios from 'axios'
import { useUserStore } from "@/store/user.js"

const API_DOMAIN = import.meta.env.VITE_API_URL

const Api = axios.create({
  baseURL: `${API_DOMAIN}`,
})

Api.interceptors.request.use(async (config) => {
  const userStore = useUserStore();
  const token = userStore.token
  if (token) config.headers.Authorization = token
  config.headers[`Content-Type`] = 'application/json';
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
  config.headers['Access-Control-Allow-Headers'] = '*';

  return config
})

export default Api