import { useEffect } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { LinkContainer } from 'react-router-bootstrap';
import { deleteProduct, fetchProducts } from '../redux/Slices/ProductList';

const ProductlistScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isAdmin } = useSelector((state) => state.user.userInfo);

  const products = useSelector((state) => state.productList.products);
  const loading = useSelector((state) => state.productList.loading);
  const error = useSelector((state) => state.productList.error);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    Navigate('/admin/product/create');
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (!isAdmin) {
    Navigate('/');
  }

  return (
    <>
      <Container>
        <Row className="justify-content-end my-3">
          <Col md={9}>
            <h1>Products</h1>
          </Col>
          <Col md={3}>
            <Button className="mr-auto" onClick={createProductHandler}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </>
  );
};

export default ProductlistScreen;
