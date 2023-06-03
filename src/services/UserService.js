import instance from "./customAxios";
const fetchAllUser = () => {
  return instance.get("/api/users?page=2");
};
export { fetchAllUser };
