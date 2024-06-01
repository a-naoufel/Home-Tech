import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader.jsx";
import Message from "../../Components/Message.jsx";

function UserListPage() {
  const [users, setUsers] = useState([
    { _id: "1", name: "moh", email: "moh@gmail.com", isAdmin: true },
    { _id: "2", name: "aymen", email: "jayemn@example.com", isAdmin: false },
  ]);

  const deleteHandler = (id) => {
    console.log(`User with id ${id} deleted.`);
  };

  return (
    <div>
      <h1>Users</h1>
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : ( */}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }}></i>
                ) : (
                  <i className="fas fa-check" style={{ color: "red" }}></i>
                )}
              </td>

              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>

                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(user._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* )} */}
    </div>
  );
}

export default UserListPage;
