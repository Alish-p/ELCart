import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

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

  return (
    <div>
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
