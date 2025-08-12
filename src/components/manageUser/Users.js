import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getAllUser, deleteUsers } from "../service/userService.js";
import "./User.scss";
import ModalDelete from "./ModalDelete.js";
import { toast } from "react-toastify";
import ModalAddNew from "./ModalAddNew.js";

import { UserContext } from "../../context/UserContext.js";

const User = () => {
  const { user } = useContext(UserContext);
  const [arrUsers, setArrUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPage, setTotalPage] = useState(0);

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModal, setDataModal] = useState({});
  const navigate = useNavigate();

  if (user && !user.authenticated) {
    navigate("/login");
  }
  useEffect(() => {
    fetchDataUser();
  }, [currentPage]);
  const fetchDataUser = async () => {
    let res = await getAllUser(currentPage, currentLimit);

    if (res && res.errCode === 0) {
      setTotalPage(res.data.totalPages);

      setArrUsers(res.data.users);
    }
  };
  const handleRefresh = () => {
    fetchDataUser();
  };
  const handleClickPage = async (event) => {
    console.log("Check event", event);

    setCurrentPage(+event.selected + 1);
  };
  const handleDeleteUser = async (user) => {
    setDataModal(user);
    setIsShowModal(true);
  };
  const handleClose = async () => {
    setIsShowModal(false);
    setIsShowModalAddNew(false);
    setDataModal({});
    await fetchDataUser();
  };
  const confirmDeleteUser = async () => {
    let res = await deleteUsers(dataModal);

    if (res && res.errCode === 0) {
      toast.success("Delete user succeed!");
      await fetchDataUser();
      setIsShowModal(false);
    } else {
      toast.success("Delete user error!");
    }
  };

  const handleAddNewUser = () => {
    setIsShowModalAddNew(true);
    setActionModalUser("CREATE");
  };
  const handleEditUser = (user) => {
    setActionModalUser("EDIT");
    setDataModal(user);
    setIsShowModalAddNew(true);
  };

  return (
    <>
      <div className="manage-users-container container">
        <div className="manage-user-header">
          <div className="header-title">
            <h2>Manage Users</h2>
          </div>
        </div>
        <div className="manage-user-body">
          <div className="body-action">
            <button className="btn-refresh" onClick={() => handleRefresh()}>
              Refresh
            </button>
            <button className="btn-add-new" onClick={() => handleAddNewUser()}>
              Add new user
            </button>
          </div>
          <div className="body-content">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Group</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {arrUsers && arrUsers.length > 0 ? (
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.gender}</td>
                        <td>{item.address}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.groupId}</td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEditUser(item)}
                          >
                            <span> Edit</span>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDeleteUser(item)}
                          >
                            <span> Delete</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPage > 0 && (
            <div className="body-footer">
              <ReactPaginate
                previousLabel={"← "}
                nextLabel={" →"}
                breakLabel={"..."}
                pageCount={totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handleClickPage}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
              />
            </div>
          )}
        </div>
      </div>
      <ModalDelete
        show={isShowModal}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModal={dataModal}
      />
      <ModalAddNew
        show={isShowModalAddNew}
        action={actionModalUser}
        onHide={handleClose}
        dataModal={dataModal}
      />
    </>
  );
};
export default User;
