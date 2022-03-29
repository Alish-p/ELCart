import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../components/OrderItem';
import { fetchOrder, placeOrder, payOrder } from '../redux/Slices/Order';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);
  const order = useSelector((state) => state.order.order);

  const successHandler = (paymentDetails) => {
    console.log(paymentDetails);
    dispatch(payOrder({ orderId: id, paymentDetails }));
  };

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await Axios.get('/api/paypal/config');

      const script = document.createElement('script');
      script.type = 'async';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;

      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    addPaypalScript();

    dispatch(fetchOrder(id));
  }, [id]);

  //error
  if (error) return <Message variant="danger">{error}</Message>;
  if (loading) return <Loader />;

  const {
    orderItems,
    paymentMethod,
    shippingAddress: { address, city, country },
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    deliveredAt,
    isDelivered,
    user,
  } = order;

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item className="pb-2">
                <h4>Shipping</h4>
                <p className="text-muted">Name: {user && user.name}</p>
                <p className="text-muted">Email: {user && user.email}</p>
                <p className="text-muted">
                  Address: {`${address},${city},${country}`}
                </p>

                {isDelivered ? (
                  <Message variant="success">
                    Delivered on {deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item className="pt-4 pb-3">
                <h4>Payment Method</h4>
                <p className="text-muted">Method : {`${paymentMethod}`}</p>

                {isPaid ? (
                  <Message variant="success">Paid on {paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item className="pt-3">
                <h4 className="pb-3">Order Items</h4>
                <ListGroup variant="flush" className="px-md-3">
                  {orderItems.map((item) => (
                    <OrderItem item={item} key={item._id} />
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
                    <Col>
                      $ {(totalPrice - shippingPrice - taxPrice).toFixed(2)}
                    </Col>
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
                    <Col>$ {taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="p-3">
                  <Row>
                    <Col>Total:</Col>
                    <Col>$ {totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup className="mt-3" variant="flush">
                {!isPaid && (
                  <PayPalButton
                    amount={totalPrice.toFixed(2)}
                    onSuccess={successHandler}
                  />
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderScreen;
