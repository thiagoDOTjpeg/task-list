import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("INTERCEPTOR: Token inválido ou expirado. Requer logout.");
    }
    return Promise.reject(error);
  }
);

export default api;
