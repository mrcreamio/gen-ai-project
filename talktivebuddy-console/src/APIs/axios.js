import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.VITE_ORIGIN_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
