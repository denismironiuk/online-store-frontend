// src/config.js
export const API_URL = window._env_?.VITE_API_URL 
  || import.meta.env.VITE_API_URL 
  || API_URL;