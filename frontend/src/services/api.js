import axios from "axios";

const URL = "http://localhost:3000";
const api = axios.create({
  baseURL: `${URL}`,
});

// Intercepetor pra sempre pegar e adicionar o token actualizado
api.interceptors.request.use((config) => {
  const getToken = JSON.parse(localStorage.getItem("dataWithTokenAuth"));
  const TOKEN = getToken?.token;

  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config
});

export default api;
