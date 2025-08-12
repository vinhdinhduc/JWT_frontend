import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { useState } from "react";
import { toast } from "react-toastify";

import { register } from "../service/userService";

const Register = (props) => {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touch, setTouch] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    address: false,
    gender: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  let handleClickAlready = () => {
    navigate("/login");
  };

  let handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let copyState = { ...person };

    copyState[id] = valueInput;
    setPerson(copyState);
  };
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  let validateInput = () => {
    let newTouch = { ...touch };
    let isValid = true;

    if (!person.firstName) {
      toast.error("First name is required");

      newTouch.firstName = true;
      isValid = false;
    }
    if (!person.lastName) {
      toast.error("Last name is required");
      newTouch.lastName = true;

      isValid = false;
    }
    if (!person.gender) {
      toast.error("Gender is required");
      newTouch.gender = true;

      isValid = false;
    }
    if (!person.address) {
      toast.error("Address is required");
      newTouch.address = true;

      isValid = false;
    }
    if (!person.phone) {
      toast.error("Phone is required");
      newTouch.phone = true;

      isValid = false;
    }
    if (!person.email) {
      toast.error("Email is required");
      newTouch.email = true;

      isValid = false;
    }
    if (!isValidEmail(person.email)) {
      toast.error("Please enter a valid email");
      newTouch.email = true;
      isValid = false;
    }
    if (!person.password) {
      toast.error("Password is required");
      newTouch.password = true;
      isValid = false;
    }
    if (person.confirmPassword !== person.password) {
      toast.error("Re-enter password does not match");
      newTouch.confirmPassword = true;

      isValid = false;
    }
    if (!person.confirmPassword) {
      toast.error("Please confirm your password");
      newTouch.confirmPassword = true;

      isValid = false;
    }

    setTouch(newTouch);

    return isValid;
  };
  let getInputClass = (field) => {
    if (!touch[field]) return "form-control";

    if (field === "email") {
      if (person[field] && isValidEmail(person[field])) {
        return "form-control is-valid";
      }
      return "form-control is-invalid";
    }

    if (field === "confirmPassword") {
      if (person[field] && person[field] === person.password) {
        return "form-control is-valid";
      }
      return "form-control is-invalid";
    }
    return person[field] ? "form-control is-valid" : "form-control is-invalid";
  };

  let getRadioClass = (value) => {
    if (!touch.gender) return "";

    if (person.gender === value) {
      return "radio-valid";
    }
    return person.gender ? "" : "radio-invalid";
  };
  let handleSignUp = async () => {
    let data = {
      ...person,
    };
    if (!validateInput()) {
      return;
    }
    try {
      let res = await register(data);

      if (res && res.errCode === 0) {
        navigate("/login");
        toast.success("Đăng kí thành công !");
      } else {
        toast.error(res?.data?.errMessage || "Đăng kí thất bại");
      }
    } catch (error) {
      console.error("Axios error:", error);
      toast.error("Không thể kết nối tới server!");
    }
  };
  return (
    <div className="register-container ">
      <div className="register-content container">
        <div className="row">
          <h2 className="title-register">Create a new account</h2>
          <div className="form-group col-6">
            <label htmlFor="">First name:</label>
            <input
              type="text"
              onBlur={() => setTouch({ ...touch, firstName: true })}
              className={getInputClass("firstName")}
              placeholder="Enter first name"
              value={person.firstName}
              onChange={(event) => handleOnChangeInput(event, "firstName")}
            />
          </div>
          <div className="form-group col-6">
            <label htmlFor="">Last name:</label>
            <input
              type="text"
              onBlur={() => setTouch({ ...touch, lastName: true })}
              className={getInputClass("lastName")}
              placeholder="Enter last name"
              value={person.lastName}
              onChange={(event) => handleOnChangeInput(event, "lastName")}
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <div className="select-radio">
              <div className={`select-item ${getRadioClass("Male")}`}>
                <label htmlFor="Male">Male</label>
                <input
                  type="radio"
                  value="Male"
                  name="gender"
                  id="Male"
                  onBlur={() => setTouch({ ...touch, gender: true })}
                  checked={person.gender === "Male"}
                  onChange={(event) => handleOnChangeInput(event, "gender")}
                />
              </div>
              <div className={`select-item ${getRadioClass("Female")}`}>
                <label htmlFor="Female">Female</label>
                <input
                  type="radio"
                  value="Female"
                  name="gender"
                  id="Female"
                  onBlur={() => setTouch({ ...touch, gender: true })}
                  checked={person.gender === "Female"}
                  onChange={(event) => handleOnChangeInput(event, "gender")}
                />
              </div>
              <div className={`select-item ${getRadioClass("Other")}`}>
                <label htmlFor="Other">Other</label>
                <input
                  type="radio"
                  value="Other"
                  name="gender"
                  id="Other"
                  onBlur={() => setTouch({ ...touch, gender: true })}
                  checked={person.gender === "Other"}
                  onChange={(event) => handleOnChangeInput(event, "gender")}
                />
              </div>
            </div>
          </div>
          <div className="form-group col-6">
            <label htmlFor="">Address:</label>
            <input
              type="text"
              onBlur={() => setTouch({ ...touch, address: true })}
              className={getInputClass("address")}
              placeholder="Enter address"
              value={person.address}
              onChange={(event) => handleOnChangeInput(event, "address")}
            />
          </div>
          <div className="form-group col-6">
            <label htmlFor="">Phone:</label>
            <input
              type="number"
              onBlur={() => setTouch({ ...touch, phone: true })}
              className={getInputClass("phone")}
              placeholder="Enter phone number"
              value={person.phone}
              onChange={(event) => handleOnChangeInput(event, "phone")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              onBlur={() => setTouch({ ...touch, email: true })}
              className={getInputClass("email")}
              placeholder="Enter email"
              value={person.email}
              onChange={(event) => handleOnChangeInput(event, "email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password:</label>
            <input
              type="password"
              onBlur={() => setTouch({ ...touch, password: true })}
              className={getInputClass("password")}
              placeholder="Enter password"
              value={person.password}
              onChange={(event) => handleOnChangeInput(event, "password")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Re-enter password:</label>
            <input
              type="password"
              onBlur={() => setTouch({ ...touch, confirmPassword: true })}
              className={getInputClass("confirmPassword")}
              placeholder="Re enter password"
              value={person.confirmPassword}
              onChange={(event) =>
                handleOnChangeInput(event, "confirmPassword")
              }
            />
          </div>

          <button
            className="btn btn-success btn-register"
            onClick={() => handleSignUp()}
          >
            {" "}
            Sign Up
          </button>
          <div className="parent-already text-center">
            {" "}
            <span
              className="already"
              onClick={() => {
                handleClickAlready();
              }}
            >
              Already have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
