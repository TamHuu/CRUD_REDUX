import instance from "./customAxios";
const fetchAllUser = (page) => {
  return instance.get(`/api/users?page= ${page}`);
};
export { fetchAllUser };
