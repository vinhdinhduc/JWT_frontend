import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../service/userService";
import { UserContext } from "../../context/UserContext";
const Login = (props) => {
  const { loginContext, user } = useContext(UserContext);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [objValue, setObjValue] = useState({
    valueInput: true,
    password: true,
  });
  const [touch, setTouch] = useState({
    valueInput: false,
    password: false,
  });
  const [valueInput, setValueInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Check user in login", user);

    if (user && user.authenticated && user.token) {
      navigate("/users", { replace: true });
    }
  }, []);

  let handleClickRegister = () => {
    navigate("/register");
  };

  let handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  let getInputClass = (field) => {
    if (!touch[field]) return "form-control";

    return objValue[field]
      ? "form-control is-valid"
      : "form-control is-invalid";
  };

  const handleLogin = async () => {
    let isValid = true;
    let newObj = { ...objValue };
    if (!valueInput) {
      newObj.valueInput = false;
      isValid = false;
      console.log(!objValue.valueInput);

      toast.error("Please enter your email or phone number!");
    } else {
      newObj.valueInput = true;
    }
    if (!password) {
      newObj.password = false;
      isValid = false;

      toast.error("Please enter your password!");
    } else {
      newObj.password = true;
    }

    setObjValue(newObj);
    setTouch({ valueInput: true, password: true });
    if (!isValid) return;

    let res = await loginUser(valueInput, password);

    console.log("Check respone nlogin", res);

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
      };

      loginContext(data);
      localStorage.setItem("jwt", token);
      navigate("/users", { replace: true });

      toast.success("Đăng nhập thành công!");
    }
    if (res && res.errCode !== 0) {
      toast.error(res.errMessage || "Đăng nhập thất bại !");
    }
  };

  return (
    <div className="login-container ">
      <div className="row">
        <div className="content-left col-md-7 d-none d-sm-block">
          <h2>Learn JWT</h2>
          <p>Learn JWT help you can charge higher job in the future</p>
        </div>
        <div className="content-right col-md-5 col-sm-12">
          <h3 className="text-center title-login"> Login</h3>
          <input
            type="text"
            className={getInputClass("valueInput")}
            placeholder="Enter email address or phone name"
            onBlur={() => {
              setTouch({ ...touch, valueInput: true });
            }}
            value={valueInput}
            onChange={(event) => setValueInput(event.target.value)}
          />
          <div className="password">
            <input
              type={isShowPassword ? "text" : "password"}
              className={getInputClass("password")}
              placeholder="Password"
              onBlur={() => {
                setTouch({ ...touch, password: true });
              }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <span
              onClick={() => {
                handleShowHidePassword();
              }}
            >
              {isShowPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
          <p className="text-center">Forgot your password?</p>
          <hr />
          <div className="create-account">
            <button
              className="btn btn-success"
              onClick={() => handleClickRegister()}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
