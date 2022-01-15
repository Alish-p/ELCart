import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProducts } from '../redux/Slices/ProductList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productList.products);
  const loading = useSelector((state) => state.productList.loading);
  const error = useSelector((state) => state.productList.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <Message>
        <h3>{error}</h3>
      </Message>
    );

  return (
    <div>
      <h2>Latest Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
