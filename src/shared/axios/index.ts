import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.spoonacular.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
