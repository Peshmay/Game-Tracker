// frontend/src/lib/api.ts
import axios from "axios";
import { getToken } from "../utils/getToken";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach token (if you have one)
api.interceptors.request.use((config) => {
  const token = getToken?.();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
