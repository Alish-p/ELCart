import { Col, Image, ListGroup, Row, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { addToCart, removeFromCart } from "../redux/Slices/Cart";
import { useDispatch } from "react-redux";
import { useState } from "react";

const CartItem = ({ item }) => {
  const { _id, image, name, price, countInStock } = item;

  const [qty, setQty] = useState(item.qty);

  const dispatch = useDispatch();

  const renderSelectOptions = () => {
    // Showing max 5 values
    const count = Math.min(countInStock || 0, 5);

    return [...Array(count).keys()].map((i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ));
  };

  // dummy

  return (
    <ListGroup.Item key={_id}>
      <Row>
        <Col md={2}>
          <Image src={image} fluid rounded></Image>
        </Col>
        <Col md={3}>
          <LinkContainer as="li" to={`/products/${_id}`}>
            <p>{name}</p>
          </LinkContainer>
        </Col>
        <Col md={2}>${price}</Col>
        <Col md={3}>
          <Form.Select
            size="sm"
            as="select"
            aria-label="select quantity"
            value={qty}
            onChange={(e) => {
              dispatch(addToCart({ product: item, qty: +e.target.value }));
              setQty(+e.target.value);
            }}
          >
            {renderSelectOptions()}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button
            type="button"
            variant="light"
            onClick={() => dispatch(removeFromCart(_id))}
          >
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartItem;
