import { getListRole, deleteRole } from "../service/roleService";
import ReactPaginate from "react-paginate";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { toast } from "react-toastify";

const TableRole = forwardRef((props, ref) => {
  const [arrRoles, setArrRoles] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRoles();
  }, [page]);
  useImperativeHandle(ref, () => ({
    reloadRoles: fetchRoles,
  }));
  const fetchRoles = async () => {
    try {
      let res = await getListRole(page, 5);
      console.log("Check res role:", res);

      if (res && res.errCode === 0) {
        setArrRoles(res.data.roles);
        setTotalPage(res.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };
  const handleClickPage = (event) => {
    setPage(event.selected + 1);
  };
  const handleEditRole = (item) => {
    props.handleEditRole(item);
    props.setAction("EDIT");
    props.setEditRole(item);
  };
  const handleDeleteRole = async (item) => {
    console.log("Delete role with id:");
    let res = await deleteRole(item.id);
    if (res && res.errCode === 0) {
      toast.success("Delete role succeed!");
      await fetchRoles();
    } else {
      toast.error(res.errMessage);
    }
  };
  return (
    <div className="table-role">
      <div className="container mt-4">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Url</th>
              <th>Description</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrRoles && arrRoles.length > 0 ? (
              arrRoles.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.url}</td>
                    <td>{item.description}</td>

                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditRole(item)}
                      >
                        <span> Edit</span>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteRole(item)}
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
  );
});
export default TableRole;
