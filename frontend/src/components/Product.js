import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
const Product = ({
  product: {
    _id,
    image,
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    rating,
    numReviews,
  },
}) => {
  return (
    <Card className="my-3 rounded p-3">
      <Link to={`products/${_id}`}>
        <Card.Img variant="top" src={image} />
      </Link>
      <Card.Body>
        <Card.Title as="div">
          <Link to={`products/${_id}`}>
            <strong>{name}</strong>
          </Link>
        </Card.Title>

        <Card.Text as="div" className="my-3">
          <Rating rating={rating} number={numReviews}></Rating>
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
