import axios from "axios";

const API_URL = "http://localhost:3001/persons";

const create = (newObj) => {
  const request = axios.post(API_URL, newObj);
  return request.then((res) => res.data);
};

const getAll = () => {
  const request = axios.get(API_URL);
  return request.then((res) => res.data);
};

const del = (id) => {
  const request = axios.delete(`${API_URL}/${id}`);
  return request.then((res) => res.data);
};

const update = (id, newObj) => {
  const request = axios.put(`${API_URL}/${id}`, newObj);
  return request.then((res) => res.data);
};

const numbersService = { create, getAll, del, update };

export default numbersService;
