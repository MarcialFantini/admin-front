import axios from "axios";
import { baseUrl } from "../../vars/baseUrl";

export const intense = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
