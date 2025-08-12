import { useContext, useEffect } from "react";
import {
  Route,
  useNavigate,
  useNavigation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { UserContext } from "../context/UserContext";
function PrivateRoutes(props) {
  const { user } = useContext(UserContext);
  console.log("checkuser", user);

  if (user && user.authenticated === true && user.token) {
    console.log(user.authenticated);

    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoutes;
