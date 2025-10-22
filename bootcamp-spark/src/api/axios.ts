// src/api/axios.ts
import axios from "axios";

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,        // only root URL here
  withCredentials: true,   // send cookies with every request
});

export default api;
