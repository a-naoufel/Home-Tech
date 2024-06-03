import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Paginate from "../../Components/Paginate";
import { FaArrowLeft } from "react-icons/fa";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import { useNavigate, useLocation } from "react-router";
import { Paginition } from "../../Components/products-shopy/Paginition";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  let keyword = query.get("keyword");
  let Page = query.get("page");
  const dispatch = useDispatch();
  let from = location.state ? location.state.from : "/";
  if (keyword) {
    keyword = "keyword=".concat(keyword).concat("&");
  } else {
    keyword = "";
  }
  console.log("keyword", keyword);

  if (Page) {
    Page = "page=".concat(Page);
  } else {
    Page = "";
  }

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  console.log("Page", Page);
  console.log("page", page);
  console.log("pages", pages);

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

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo) {
      navigate("/login", { state: { from: "/admin/productlist" } });
    } else if (!userInfo.isAdmin) {
      if (from === "/admin/productlist") {
        navigate("/");
      } else {
        navigate(from);
      }
    }
    console.log("page", page);
    console.log("Page", Page);
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword, Page));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
    Page,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  console.log("Keyword", keyword);

  if (products.length === 0) {
    return loading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <div
        className="container flex flex-col items-center justify-center py-14"
        style={{ minHeight: `calc(100vh - 70.94px)` }}
      >
        <h1 className="text-4xl font-bold">No Products Found</h1>
      </div>
    );
  }

  return (
    <div  className="m-5">
      <LinkContainer to="/admin">
        <button className="bg-mainColor text-white absolute left-12 top-[150px]   flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed">
          <FaArrowLeft />
        </button>
      </LinkContainer>

      <h1 className="mt-5 mb-10  text-center text-4xl font-bold">
        <center>Products</center>
      </h1>
      <Row className="align-items-center">
        <Col></Col>

        <Col className="text-right">
          <Button
            onClick={createProductHandler}
            className=" bg-mainColor hover:bg-[#0062ff] mt-3 mb-4 p-[12px] w-[150px] rounded-[25px]"
          >
            <i className="text-lg">Create Product</i>{" "}
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
          <Paginition
            PAGES={pages}
            currentPage={page}
            setCurrentPage={(e) => {
              console.log("e", e);
              console.log("keyword", keyword);
              console.log(
                "/admin/productlist/?".concat(keyword).concat("page=").concat(e)
              );
              navigate(
                "/admin/productlist?".concat(keyword).concat("page=").concat(e)
              );
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductListPage;
