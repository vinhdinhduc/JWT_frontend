import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Dropdown } from "react-bootstrap";
import { logOutUser } from "../service/userService";
import { toast } from "react-toastify";
const NavBar = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const hiddenPaths = ["/login", "/register"];
  const shouldShow =
    // user?.authenticated &&
    !hiddenPaths.includes(location.pathname);

  const handleLogout = async () => {
    let res = await logOutUser();
    logoutContext();
    localStorage.removeItem("jwt");
    navigate("/login", { replace: true });
    if (res && res.errCode === 0) {
      toast.success("Logout successfully!");
    } else {
      toast.error("Logout failed!");
    }
  };
  if (!shouldShow) return null;

  return (
    <>
      <nav className="navbar-container container">
        <div className="nav-left">
          <NavLink to="/" className="nav-link">
            {" "}
            Home{" "}
          </NavLink>
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
          <NavLink to="/roles" className="nav-link">
            Roles
          </NavLink>
          <NavLink to="/group/roles" className="nav-link">
            Group Roles
          </NavLink>
          <NavLink to="/project" className="nav-link">
            Project
          </NavLink>
        </div>
        <div className="nav-right">
          {user ? (
            <>
              <span className="user-info">
                {" "}
                {user?.account?.firstName} {user?.account?.lastName}
              </span>
              <Dropdown show={showDropdown} onToggle={setShowDropdown}>
                <Dropdown.Toggle variant="light" id="dropdown-user">
                  <span className="setting">Setting</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
