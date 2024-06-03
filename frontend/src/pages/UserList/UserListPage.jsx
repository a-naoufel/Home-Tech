import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader.jsx";
import Message from "../../Components/Message.jsx";
import { listUsers, deleteUser } from "../../actions/userActions.js";
import { useNavigate, useLocation } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

function UserListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let from = location.state ? location.state.from : "/";
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else if (userInfo) {
      navigate(from);
    } else {
      navigate("/login", { state: { from: "/admin/userlist" } });
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };
  console.log("users", users);
  console.log("userInfo", userInfo);
  if (users && users.length <= 0) {
    return loading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <div
        className="container flex flex-col items-center justify-center py-14"
        style={{ minHeight: `calc(100vh - 70.94px)` }}
      >
        <h1 className="text-4xl font-bold mb-5">No Users Found</h1>
      </div>
    );
  }
  return (
    <div>
      <LinkContainer to="/admin">
        <button className="bg-mainColor text-white absolute left-12 top-[150px]   flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed">
          <FaArrowLeft />
        </button>
      </LinkContainer>
      <h1 className="mt-5 mb-10 text-center text-4xl font-bold">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => {
              if (user._id != userInfo._id) {
                return(
                <>
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="bi bi-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i className="bi bi-check" style={{ color: "red" }}></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm px-4 py-3">
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm py-3 px-4"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i
                          className="bi bi-trash"
                          style={{ color: "black" }}
                        ></i>
                      </Button>
                    </td>
                  </tr>
                </>);
              }
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListPage;
