// import axios from "axios";
import axios from "../../setup/axios";
const register = (data) => {
  return axios.post("/register", data);
};
const loginUser = (infoValue, password) => {
  return axios.post("/login", {
    infoValue,
    password,
  });
};

const getAllUser = (page, limit) => {
  return axios.get(`/users/read?page=${page}&limit=${limit}`);
};
const deleteUsers = (user) => {
  return axios.delete("/users/delete", {
    data: { id: user.id },
  });
};
const getAllGroup = () => {
  return axios.get("/users/group/read");
};

const createNewUser = (data) => {
  return axios.post("/users/create", data);
};

const updateUser = (data) => {
  return axios.put("/users/update", data);
};

const getUserAccount = () => {
  return axios.get("/account");
};
const logOutUser = () => {
  return axios.get("/logout");
};

export {
  register,
  loginUser,
  getAllUser,
  deleteUsers,
  getAllGroup,
  createNewUser,
  updateUser,
  getUserAccount,
  logOutUser,
};
