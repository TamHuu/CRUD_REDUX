import React, { useEffect, useState } from "react";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import Table from "react-bootstrap/Table";
const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    getUsers(1);
  }, []);
  console.log("check list user", listUser);
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    console.log(">>>>check new res", res);
    if (res && res.data) {
      setListUser(res.data);
      setTotalUser(res.total);
      setTotalPage(res.total_pages);
    }
  };
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
              </tr>
            ))}
        </tbody>
      </Table>
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
    </>
  );
};

export default TableUsers;
