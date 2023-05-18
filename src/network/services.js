import axios from "axios";
import { URL } from "./config";

export const getProducts = async () => {
  return await axios
    .get(`${URL}/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => res)
    .catch((err) => err);
};

export const getUser = async () => {
  return await axios
    .get(`${URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => res)
    .catch((err) => err);
};

export const postProducts = (body) =>
  axios.post(`${URL}/products`, body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const deleteProducts = (id) =>
  axios.delete(`${URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const editProducts = (id, body) =>
  axios.put(`${URL}/products/${id}`, body, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
