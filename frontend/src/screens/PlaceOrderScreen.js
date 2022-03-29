import { useEffect, useRef } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import OrderItem from '../components/OrderItem';
import { placeOrder, resetOrder } from '../redux/Slices/Order';
import { useNavigate } from 'react-router-dom';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const {
    cartItems,
    paymentMethod,
    shippingAddress: { address, city, country },
    error,
  } = useSelector((state) => state.cart);

  const { _id } = useSelector((state) => state.order.order);

  const itemPrice = cartItems.reduce((acc, cv) => cv.price * cv.qty + acc, 0);
  const shippingPrice = itemPrice >= 500 ? 0 : 500;
  const tax = itemPrice * 0.18;
  const totalPrice = itemPrice + shippingPrice + tax;

  const handlePlaceOrder = () => {
    dispatch(placeOrder({ taxPrice: tax, shippingPrice, totalPrice }));
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      dispatch(resetOrder());
      return;
    }

    if (_id) {
      Navigate(`/order/${_id}`);
    }
  }, [_id]);

  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <CheckoutSteps step1 step2 step3 step4 />
        </Col>
      </Row>

      <Container>
        <Row>
          <Col xs={12} md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item className="pb-2">
                <h4>Shipping</h4>
                <p className="text-muted">
                  Address: {`${address},${city},${country}`}
                </p>
              </ListGroup.Item>
              <ListGroup.Item className="pt-4 pb-3">
                <h4>Payment Method</h4>
                <p className="text-muted">Method : {`${paymentMethod}`}</p>
              </ListGroup.Item>
              <ListGroup.Item className="pt-3">
                <h4 className="pb-3">Order Items</h4>
                <ListGroup variant="flush" className="px-md-3">
                  {cartItems.map((item) => (
                    <OrderItem item={item} />
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col xs={12} md={4}>
            <Card className="my-3">
              <ListGroup variant="flush">
                <ListGroup.Item className="p-3">
                  <Row>
                    <h4>Order Summary</h4>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>Items:</Col>
                    <Col>$ {itemPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>$ {shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>Tax:</Col>
                    <Col>$ {tax.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>Total:</Col>
                    <Col>$ {totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Button
                      className="px-2"
                      onClick={handlePlaceOrder}
                      disabled={cartItems === 0}
                    >
                      Place Order
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
