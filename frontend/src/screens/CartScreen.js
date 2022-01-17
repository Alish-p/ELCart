import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';

import { LinkContainer } from 'react-router-bootstrap';
import CartItem from '../components/CartItem';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  return (
    <div>
      <Row>
        <Col lg={8}>
          <Row className="mb-3">
            <h2>Shopping Cart</h2>
          </Row>
          {cartItems && cartItems.length === 0 ? (
            <Message>Cart is empty.</Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </ListGroup>
          )}
        </Col>
        <Col lg={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h3>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  // onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
