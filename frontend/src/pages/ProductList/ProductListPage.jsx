import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Paginate from "../../Components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import { useNavigate, useLocation } from "react-router";

function ProductListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  let from = location.state ? location.state.from : "/";

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let keyword = location.search;
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo) {
      navigate("/login", { state: { from: "/admin/productlist" } });
    } else if (!userInfo.isAdmin) {
      if (from === "/admin/productlist") {
        navigate("/");
      }
      else{navigate(from);}
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <LinkContainer to="/admin/orderlist">
        <Button className="btn btn-light my-3">Orders</Button>
      </LinkContainer>
      <LinkContainer to="/admin/userlist">
        <Button className="btn btn-light my-3">Users</Button>
      </LinkContainer>
          <h1 className="mt-5 mb-10  text-center text-4xl font-bold"><center>Products</center></h1>
      <Row className="align-items-center">
        <Col>
        </Col>

        <Col className="text-right">
          <Button 
          onClick={createProductHandler}
          className="my-3">
            <i className="" style={{ color: "black" }}>Create Product</i>{" "}
            +
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : ( 
      <div>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm px-4 py-3">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm px-4 py-3"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="bi bi-trash" style={{ color: "black" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
         <Paginate pages={pages} page={page} isAdmin={true} /> 
      </div>
      )} 
    </div>
  );
}

export default ProductListPage;
