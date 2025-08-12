import React, { useState, useEffect } from "react";
import { getAllGroup } from "../service/userService";
import { getRoleByGroup, getListRole } from "../service/roleService";

import "./GroupRole.scss";
const GroupRole = () => {
  const [arrGroup, setArrGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [roleByGroup, setRoleByGroup] = useState([]);
  const [arrRole, setArrRole] = useState([]);

  useEffect(() => {
    fetchGroup();
    fetchAllRoles();
  }, []);
  const fetchRoleByGroup = async (groupId) => {
    console.log("Check groupId", groupId);
    let res = await getRoleByGroup(groupId);
    console.log("Check res role by group", res);
    if (res && res.errCode === 0) {
      setRoleByGroup(res.data.Roles);
      setSelectedGroup(groupId);
    }
  };
  const fetchAllRoles = async () => {
    let res = await getListRole();
    console.log("Check res all roles", res);
    if (res && res.errCode === 0) {
      setArrRole(res.data);
    }
  };

  const fetchGroup = async () => {
    let res = await getAllGroup();
    console.log("res group", res);
    if (res && res.errCode === 0) {
      if (res.data && res.data.length > 0) {
        setArrGroup(res.data);
        setSelectedGroup(res.data[0].id);
        fetchRoleByGroup(res.data[0].id);
      }
    }
  };
  return (
    <div className="group-role-container container mt-4">
      <h1 className="text-center"> Group Role Management</h1>
      <div>
        <select
          name=""
          id=""
          value={selectedGroup}
          onChange={(e) => {
            setSelectedGroup(e.target.value);
            fetchRoleByGroup(e.target.value);
          }}
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
        <hr />
        <div className="list-role">
          {roleByGroup &&
            roleByGroup.length > 0 &&
            roleByGroup.map((item, index) => {
              return (
                <div key={item.id} className="role-item">
                  <label>{item.url}</label>
                  <input type="checkbox" />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
