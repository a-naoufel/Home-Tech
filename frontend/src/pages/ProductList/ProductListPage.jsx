import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

function ProductListPage() {
  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "Product 1",
      price: 29.99,
      category: "Category 1",
      brand: "Brand 1",
    },
    {
      _id: "2",
      name: "Product 2",
      price: 49.99,
      category: "Category 2",
      brand: "Brand 2",
    },
  ]);

  const deleteHandler = (id) => {
    console.log(`Product with id ${id} deleted.`);
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3">
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {/* {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : ( */}
      <div>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
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
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
      </div>
      {/* )} */}
    </div>
  );
}

export default ProductListPage;
