import axios from "axios";
// import { getEnvVariables } from "../helpers";
// const { VITE_API_URL } = getEnvVariables();

//el codigo documentado de arriba lo utilizare para desarrollo y correr las pruebas unitarias, de lo contrario la version de produccion fallaria
//por el import.meta.env y sus coalisiones

const { VITE_API_URL } = import.meta.env;

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };
  return config;
});

export default calendarApi;
