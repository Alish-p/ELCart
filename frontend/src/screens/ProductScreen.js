import { useEffect } from 'react';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchProduct } from '../redux/Slices/ProductItem';

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.productItem.product);
  const loading = useSelector((state) => state.productItem.loading);
  const error = useSelector((state) => state.productItem.error);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  const {
    image,
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    rating,
    numReviews,
  } = product;

  if (loading) return <Loader />;
  if (error)
    return (
      <Message>
        <h3>{error}</h3>
      </Message>
    );

  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        <i class="fas fa-angle-left"></i> Go Back
      </Link>
      <Row>
        <Col lg={6}>
          <Image fluid src={image} alt="product" rounded />
        </Col>
        <Col lg={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="py-3">
              <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item className="py-3">
              <Rating rating={rating} number={numReviews} />
            </ListGroup.Item>
            <ListGroup.Item className="py-3">
              <span className="fw-bold">Price: </span> ${price}
            </ListGroup.Item>
            <ListGroup.Item className="text-wrap py-3">
              <p className="text-justify">
                <span className="fw-bold">Description: </span>
                {description}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg={3}>
          <Card className="my-3">
            <ListGroup variant="flush">
              <ListGroup.Item className="p-3">
                <Row>
                  <Col>Price:</Col>
                  <Col>${price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Col>Status:</Col>
                  <Col>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="p-3">
                <Row>
                  <Button
                    variant="dark"
                    className="btn-block"
                    disabled={countInStock <= 0}
                  >
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
