import axios from "axios";

const API = axios.create({
  baseURL: "https://agriconnect-0u68.onrender.com",
});

export default API;