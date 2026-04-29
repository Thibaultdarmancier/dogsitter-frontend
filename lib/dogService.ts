import { API } from "./api";

export const getDogs = async () => {
  const res = await API.get("/dog");
  return res.data;
};
