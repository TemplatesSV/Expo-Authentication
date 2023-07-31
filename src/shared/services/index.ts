import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiConfig = () => {
  const token = AsyncStorage.getItem("BearerToken")
    .then((res) => res)
    .catch((err) => err);

  const requests = axios.create({
    baseURL: process.env.API_URL,
  });

  if (token) {
    requests.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return requests;
};

const api = apiConfig();

export default api;
