import axios from "axios";

const API = axios.create({
  baseURL: "https://agriconnect-1-l9s0.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;