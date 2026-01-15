import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

console.log("MY API URL IS:", BASE_URL); // <--- Добавь эту строку!

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});