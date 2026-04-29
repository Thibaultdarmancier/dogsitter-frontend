import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000", // adapte si besoin
});
