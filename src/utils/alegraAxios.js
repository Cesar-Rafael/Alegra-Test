import axios from "axios";
import { backendURL, backendToken } from "../config";

const alegraAxios = axios.create({
  baseURL: backendURL,
});

alegraAxios.defaults.headers.common.Authorization = `Basic ${backendToken}`;

alegraAxios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "There is an error!"
    )
);

export default alegraAxios;
