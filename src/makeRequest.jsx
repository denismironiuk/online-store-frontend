import axios from "axios";
import { API_URL} from "./config.js";

export const makeRequest = axios.create({
  baseURL: API_URL,
});