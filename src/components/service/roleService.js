import axios from "../../setup/axios";

const getListRole = (page, limit) => {
  return axios.get(`/roles/read?page=${page}&limit=${limit}`);
};
const createRole = (data) => {
  return axios.post("/roles/create", data);
};
const updateRole = (data) => {
  return axios.put("/roles/update", data);
};
const deleteRole = (id) => {
  return axios.delete(`/roles/delete/${id}`);
};

const getRoleByGroup = (groupId) => {
  return axios.get(`/users/get-role-by-group/${groupId}`);
};
export { getListRole, createRole, deleteRole, updateRole, getRoleByGroup };
