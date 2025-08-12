import { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../../src/components/service/userService";

import { useLocation } from "react-router-dom";
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const location = useLocation();
  const userDefault = {
    isLoading: true,
    authenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(userDefault);

  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };
  const fetchAccount = async () => {
    let res = await getUserAccount();

    if (res && res.errCode === 0) {
      let groupWithRoles = res.data.groupWithRoles;
      let email = res.data.email;
      let firstName = res.data.firstName;
      let lastName = res.data.lastName;
      let token = res.data.access_token;

      let data = {
        authenticated: true,
        token,
        account: {
          groupWithRoles,
          email,
          firstName,
          lastName,
        },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };
  useEffect(() => {
    // if (location.pathname === "/login" || location.pathname === "/register") {
    //   setUser({ ...userDefault, isLoading: false });
    //   return;
    localStorage.getItem("jwt");
    // }
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/" &&
      location.pathname !== "/register" &&
      localStorage.getItem("jwt")
    ) {
      fetchAccount();
    } else {
      setUser({ ...user, isLoading: false });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
