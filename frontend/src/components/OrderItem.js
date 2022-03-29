import { Col, Image, ListGroup, Row } from 'react-bootstrap';

const OrderItem = ({ item }) => {
  const { _id, image, name, price, qty } = item;

  return (
    <ListGroup.Item key={_id}>
      <Row>
        <Col sm={2}>
          <Image src={image} fluid rounded></Image>
        </Col>
        <Col sm={6}>
          <p>{name}</p>
        </Col>
        <Col sm={4}>{`${qty} x $${price} = $${qty * price}`}</Col>
      </Row>
    </ListGroup.Item>
  );
};

export default OrderItem;
