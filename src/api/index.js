import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
