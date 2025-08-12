import { BrowserRouter, Route, Link, Routes, NavLink } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import User from "../components/manageUser/Users";
import Default from "../pages/Default";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/role/Role";
import GroupRole from "../components/role/GroupRole";

function AppRoutes() {
  const Project = () => {
    return <span>project</span>;
  };
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<User />} />
          <Route path="/project" element={<Project />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/group/roles" element={<GroupRole />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" />
        <Route path="/contact" />
        <Route path="*" element={<Default />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
