import React, { useState, useRef } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import TableRole from "./TableRole";
import { createRole, updateRole } from "../../components/service/roleService";
import "./Role.scss";
import { toast } from "react-toastify";
const Role = (props) => {
  const [listChild, setListChild] = useState({
    child1: { url: "", description: "" },
  });
  const [action, setAction] = useState("CREATE");
  const [editRole, setEditRole] = useState({});
  const tableRef = useRef();

  const handleAddNewInput = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChild(_listChild);
  };

  const buildData = () => {
    let data = [];
    Object.entries(listChild).forEach(([key, child]) => {
      data.push({
        url: child.url,
        description: child.description,
      });
    });
    return data;
  };
  const handleSaveRole = async () => {
    let data = buildData();
    let res;

    if (action === "CREATE") {
      res = await createRole(data);
    } else if (action === "EDIT") {
      console.log(data);

      res = await updateRole({
        id: editRole.id,
        data,
      });
    }
    console.log("Check res role:", res);

    if (res && res.errCode === 0) {
      if (action === "CREATE") {
        toast.success("Create role succeed!");
      }
      if (action === "EDIT") {
        toast.success("Update role succeed!");
      }

      setListChild({
        child1: { url: "", description: "" },
      });
      handleReset();
      tableRef.current.reloadRoles();
    } else {
      toast.error();
    }
  };
  const handleEditRole = (item) => {
    setAction("EDIT");
    setEditRole(item);
    setListChild({
      child1: {
        url: item.url,
        description: item.description,
      },
    });
  };

  const handleReset = () => {
    setListChild({
      child1: { url: "", description: "" },
    });
    setAction("CREATE");
    setEditRole({});
  };
  const handleOnChangeInput = (value, key, field) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][field] = value;
    setListChild(_listChild);
  };

  const handleDeleteInput = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };
  return (
    <div className="role-container">
      <div className="container mt-4">
        <div className="title-role">
          {" "}
          <h1>Role Management</h1>
          {action === "EDIT" && (
            <div className="alert alert-info">
              Editing Role ID: {editRole?.id}
            </div>
          )}
        </div>
        <div className="content-role">
          {Object.entries(listChild).map(([key, child], index) => {
            return (
              <div className="row role-child" key={`child-${key}`}>
                <div className={`col-5 form-group ${key}`}>
                  <label htmlFor="">URL:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={child.url}
                    onChange={(event) =>
                      handleOnChangeInput(event.target.value, key, "url")
                    }
                  />
                </div>
                <div className="col-5 form-group ">
                  <label htmlFor="">Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={child.description}
                    onChange={(event) =>
                      handleOnChangeInput(
                        event.target.value,
                        key,
                        "description"
                      )
                    }
                  />
                </div>
                <div className="col-2 mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleAddNewInput();
                    }}
                  >
                    Add
                  </button>
                  {index >= 1 && (
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => {
                        handleDeleteInput(key);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <button
            className="btn btn-success"
            onClick={() => {
              handleSaveRole();
            }}
          >
            {action === "CREATE" ? "Save" : "Update"}
          </button>
        </div>
        <div className="mt-3">
          <TableRole
            ref={tableRef}
            handleEditRole={handleEditRole}
            action={action}
            setAction={setAction}
            setEditRole={setEditRole}
          />
        </div>
      </div>
    </div>
  );
};
export default Role;
