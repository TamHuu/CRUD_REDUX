import instance from "./customAxios";
const fetchAllUser = (page) => {
  return instance.get(`/api/users?page= ${page}`);
};

const postCreateUser = (name, job) => {
  return instance.post("/api/users", { name: name, job: job });
};

const putUpdateUser = (name, job) => {
  return instance.put("/api/users", { name: name, job: job });
};
const deteleUser = (id) => {
  return instance.delete(`/api/users/${id}`);
};
const loginApi = (email, password) => {
  return instance.post("/api/login", { email, password });
};
export { fetchAllUser, postCreateUser, putUpdateUser, deteleUser, loginApi };
