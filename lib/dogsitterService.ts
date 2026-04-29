import { API } from "./api";

export const getDogsitters = async () => {
  const res = await API.get("/dogsitter");
  return res.data;
};
