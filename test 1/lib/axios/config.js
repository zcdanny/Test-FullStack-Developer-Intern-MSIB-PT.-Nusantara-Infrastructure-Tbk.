import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.apiURL,
  "Content-Type": "application/json",
  // withCredentials: true,
});
export default apiClient;
