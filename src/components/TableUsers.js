import React, { useEffect, useState } from "react";
import { fetchAllUser } from "../services/UserService";
import Table from "react-bootstrap/Table";
const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  console.log("check list user", listUser);
  const getUsers = async () => {
    let res = await fetchAllUser();
    console.log(">>>>check new res", res);
    if (res && res.data) {
      setListUser(res.data);
    }
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
    </>
  );
};

export default TableUsers;
