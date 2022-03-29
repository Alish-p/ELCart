import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Formik, Field } from 'formik';
import {
  SignupSchema,
  validateConfirmPassword,
} from '../Utils/ValidationSchema';
import { updateUser } from '../redux/Slices/User';
import Message from '../components/Message';
import TextField from '../Utils/FormComponents/TextField';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { fetchAllOrders } from '../redux/Slices/Order';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '';

  const userError = useSelector((state) => state.user.error);
  const userLoading = useSelector((state) => state.user.loading);
  const userMessage = useSelector((state) => state.user.message);

  const orders = useSelector((state) => state.order.orders);
  const ordersError = useSelector((state) => state.user.error);
  const ordersLoading = useSelector((state) => state.user.loading);

  const { _id, name, email, password } = useSelector(
    (state) => state.user.userInfo
  );

  useEffect(() => {
    console.log('calling');
    dispatch(fetchAllOrders());
  }, [searchParams, _id]);

  const initialvalues = {
    name,
    email,
    password: '',
    confirmPassword: password,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(updateUser(values));
    setSubmitting(false);
  };

  return (
    <>
      <Row>
        <Col md={2}>
          <h4>My Profile</h4>
          <div className="mt-5">
            {userError && <Message variant="danger">{userError}</Message>}
            {userLoading && <Loader size="sm" />}
            {userMessage && <Message variant="success">{userMessage}</Message>}

            <Formik
              initialValues={initialvalues}
              onSubmit={handleSubmit}
              validationSchema={SignupSchema}
            >
              {({ isSubmitting, handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    type="text"
                    name="name"
                    component={TextField}
                    label="Name"
                    size="sm"
                  />
                  <Field
                    type="email"
                    name="email"
                    component={TextField}
                    label="Email"
                    size="sm"
                  />
                  <Field
                    type="password"
                    name="password"
                    component={TextField}
                    label="Password"
                    size="sm"
                  />

                  <Field
                    type="password"
                    name="confirmPassword"
                    component={TextField}
                    label="Confirm Password"
                    validate={(value) =>
                      validateConfirmPassword(values.password, value)
                    }
                    size="sm"
                  />

                  <Button type="submit" disabled={isSubmitting}>
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>

        <Col md={10}>
          <h3 className="text-center">My Orders</h3>

          {ordersLoading && <Loader size="sm" />}
          {ordersError && <Message variant="danger"> {ordersError}</Message>}
          {/* {orders && } */}
          {!ordersLoading && !ordersError && orders.length === 0 ? (
            <Message variant="success">No Past Orders</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
