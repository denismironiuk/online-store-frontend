import axios from "axios";

// Сначала смотрим в window (для K8s), потом в import.meta (для локальной разработки)
const API_URL = window._env_?.VITE_API_URL || import.meta.env.VITE_API_URL;

export const makeRequest = axios.create({
  baseURL: API_URL,
});