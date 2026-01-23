import axios from "axios"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // backend Laravel
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Ajouter token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Gérer erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/auth"
    }
    return Promise.reject(error)
  }
)

export default api
