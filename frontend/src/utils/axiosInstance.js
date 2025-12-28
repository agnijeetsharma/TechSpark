import axios from "axios";
import { Base_URL } from "../constant";
const api = axios.create({
  baseURL: Base_URL
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
//   console.log("Token from localStorage:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
