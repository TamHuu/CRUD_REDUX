import React, { useEffect, useState } from "react";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import Table from "react-bootstrap/Table";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import { debounce } from "lodash";
import _ from "lodash";
import ModalDeleteUser from "./ModalDeleteUser";
import "./TableUser.scss";
import { CSVLink } from "react-csv";
const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [totalPage, setTotalPage] = useState(0);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("asc");

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListuser = _.cloneDeep(listUser);
    cloneListuser = _.orderBy(cloneListuser, [sortField], [sortBy]);
    // update list user khi edit
    setListUser(cloneListuser);
  };

  useEffect(() => {
    getUsers(1);
  }, []);
  const handleUpdate = (user) => {
    setListUser([user, ...listUser]);
  };

  const handleEditFromModal = (user) => {
    // dung lodash clone object khong lam thay doi dia chi object kia
    let cloneListuser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListuser[index].first_name = user.first_name;
    // update list user khi edit
    setListUser(cloneListuser);
  };

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data) {
      setListUser(res.data);

      setTotalPage(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleModalEdit = (user) => {
    setIsShowModalEdit(true);
    setDataUserEdit(user);
  };

  const handleModalDelete = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteFromModal = (user) => {
    let cloneListuser = _.cloneDeep(listUser);
    cloneListuser = cloneListuser.filter((item) => item.id !== user.id);
    // update list user khi edit
    setListUser(cloneListuser);
  };

  const handleFilterUser = debounce((filterUser) => {
    let term = filterUser;
    if (term) {
      let cloneListuser = _.cloneDeep(listUser);
      cloneListuser = cloneListuser.filter((item) => item.email.includes(term));
      setListUser(cloneListuser);
    } else {
      getUsers(1);
    }
  }, 1000);
  const [dataExport, setDataExport] = useState([]);
  const getUsersExport = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["ID", "Email", "First name", "Last name"]);
      listUser.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        return result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  return (
    <>
      <div className="my-3 add-new d-sm-flex">
        <span>
          <b>
            List Users:{sortBy}-{sortField}
          </b>
        </span>
        <div className="group-actions mt-sm-0 mt-2">
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-plus"></i>
            Add new user
          </button>
          <CSVLink
            data={dataExport}
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-export "></i>Export
          </CSVLink>
          <CSVLink
            data={dataExport}
            filename={"my-file.csv"}
            className="btn btn-secondary"
            target="_blank"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-import "></i>Import
          </CSVLink>
        </div>
      </div>
      <div className="col-xs-12 col-sm-4 my-3">
        <input
          className="form-control"
          placeholder="Search user by email..."
          onChange={(e) => handleFilterUser(e.target.value)}
        />
      </div>
      <div className="customize-table">
        {" "}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <div className="sort-header">
                  <span>ID</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort("desc", "id")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort("asc", "id")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Email</th>
              <th>
                <div className="sort-header">
                  <span>First Name</span>
                  <span>
                    <i
                      className="fa-solid fa-arrow-down-long"
                      onClick={() => handleSort("desc", "first_name")}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-up-long"
                      onClick={() => handleSort("asc", "first_name")}
                    ></i>
                  </span>
                </div>
              </th>
              <th>Last Name</th>
              <th>
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                      <button
                        className="btn btn-warning mx-3"
                        onClick={() => handleModalEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger "
                        onClick={() => handleModalDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <div className="paginate">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      />
      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditFromModal={handleEditFromModal}
      />
      <ModalDeleteUser
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteFromModal={handleDeleteFromModal}
      />
    </>
  );
};

export default TableUsers;
