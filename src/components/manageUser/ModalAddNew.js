import { Modal, Button } from "react-bootstrap";
import { getAllGroup, createNewUser, updateUser } from "../service/userService";
import { useEffect, useState } from "react";

import _ from "lodash";
import { toast } from "react-toastify";
const ModalAddNew = (props) => {
  const defaultUserData = {
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    firstName: "",
    lastName: "",
    gender: "",
    group: "",
  };

  const validInputDefault = {
    email: true,
    phoneNumber: true,
    password: true,
    address: true,
    firstName: true,
    lastName: true,
    gender: true,
    group: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [validInput, setValidInput] = useState(validInputDefault);
  const [arrGroup, setArrGroup] = useState([]);

  useEffect(() => {
    fetchGroup();
  }, []);
  const fetchGroup = async () => {
    let res = await getAllGroup();
    console.log("res group", res);

    if (res && res.errCode === 0) {
      if (res && res.data.length > 0) {
        let groups = res.data;
        setArrGroup(groups);
        if (props.action === "CREATE") {
          setUserData((prev) => ({ ...prev, group: groups[0].id }));
        }
      }
    }
  };
  useEffect(() => {
    if (props.action === "EDIT") {
      console.log("Edit data:", props.dataModal); // Debug log
      console.log("Available groups:", arrGroup);
      console.log("check datamodal group ", props.dataModal.groupId);

      setUserData({ ...props.dataModal, group: props.dataModal.Group?.id });
    } else if (props.action === "CREATE") {
      setUserData((prev) => ({
        ...defaultUserData,
        group: arrGroup[0]?.id,
      }));
    }
  }, [props.show, arrGroup, props.action, props.dataModal]);

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidInput = () => {
    setValidInput(validInputDefault);

    const arrValid = ["email", "phoneNumber", "group"];
    if (props.action === "CREATE") {
      arrValid.push("password");
    }
    let check = true;
    for (let i = 0; i < arrValid.length; i++) {
      if (!userData[arrValid[i]]) {
        let _validInput = _.cloneDeep(validInputDefault);
        _validInput[arrValid[i]] = false;
        setValidInput(_validInput);

        toast.error(`Empty input ${arrValid[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    if (checkValidInput()) {
      let res;
      if (props.action === "CREATE") {
        res = await createNewUser({
          ...userData,
          groupId: userData["group"],
        });
      } else if (props.action === "EDIT") {
        res = await updateUser({
          id: props.dataModal.id,
          ...userData,
          groupId: userData["group"],
        });
      }
      if (res && res.errCode === 0) {
        props.onHide();
        toast.success(
          props.action === "CREATE"
            ? "Add new user succeed!"
            : "Update user succeed!"
        );
        setUserData((prev) => ({ ...defaultUserData, group: prev.group }));
      } else {
        toast.error(
          props.action === "CREATE" ? "Add new user fail!" : "Update user fail!"
        );
      }
    }
  };

  const handleCloseModal = () => {
    props.onHide();
    setUserData(defaultUserData);
    setValidInput(validInputDefault);
  };
  return (
    <Modal
      show={props.show}
      onHide={() => handleCloseModal()}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.action === "CREATE" ? "Add new user" : "Edit user"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-body row">
          <div className="col-12 col-sm-6 form-group">
            <label htmlFor="">
              Email address( <span className="text-danger">*</span> ):
            </label>
            <input
              type="email"
              disabled={props.action === "CREATE" ? false : true}
              className={
                validInput.email ? "form-control" : "form control is-invalid"
              }
              value={userData.email}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "email")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label htmlFor="">
              Phone number( <span className="text-danger">*</span> ):
            </label>
            <input
              type="number"
              disabled={props.action === "CREATE" ? false : true}
              className={
                validInput.phoneNumber
                  ? "form-control"
                  : "form control is-invalid"
              }
              value={userData.phoneNumber}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "phoneNumber")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            {props.action === "CREATE" && (
              <>
                <label htmlFor="">
                  Password( <span className="text-danger">*</span> ):
                </label>
                <input
                  type="password"
                  className={
                    validInput.password
                      ? "form-control"
                      : "form control is-invalid"
                  }
                  value={userData.password}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "password")
                  }
                />
              </>
            )}
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              className="form-control"
              value={userData.firstName}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "firstName")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label htmlFor="">Last name</label>
            <input
              type="text"
              className="form-control"
              value={userData.lastName}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "lastName")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label htmlFor="">Address</label>
            <input
              type="text"
              className="form-control"
              value={userData.address}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "address")
              }
            />
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label htmlFor="">Gender</label>
            <select
              name=""
              id=""
              className="form-select"
              value={userData.gender}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "gender")
              }
            >
              <option defaultValue="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-12 col-sm-6 form-group">
            <label htmlFor="">Group</label>
            <select
              name=""
              id=""
              className={
                validInput.group ? "form-select" : "form-select is-invalid"
              }
              value={userData.group}
              onChange={(event) =>
                handleOnChangeInput(event.target.value, "group")
              }
            >
              {arrGroup &&
                arrGroup.length > 0 &&
                arrGroup.map((item, index) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {" "}
                      {item.name}{" "}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseModal()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => handleConfirmUser()}>
          {props.action === "CREATE" ? "Save" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalAddNew;
