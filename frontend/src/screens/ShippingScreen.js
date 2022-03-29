import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { LoginSchema, ShippingSchema } from '../Utils/ValidationSchema';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { loginUser } from '../redux/Slices/User';
import { saveShippingAddress } from '../redux/Slices/Cart';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TextField from '../Utils/FormComponents/TextField';
import FormContainer from '../components/FormContainer';
import { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '';

  const error = useSelector((state) => state.cart.error);
  const loading = useSelector((state) => state.cart.loading);

  const { address, city, country, pincode } =
    useSelector((state) => state.cart.shippingAddress) || {};

  const initialvalues = {
    address,
    city,
    country,
    pincode,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(saveShippingAddress(values));
    setSubmitting(false);
    Navigate('/payment');
  };
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <CheckoutSteps step1 step2 />
        </Col>
      </Row>
      <FormContainer>
        <h2 className="my-3 text-center">Shipping</h2>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader size="sm" />}
        <Formik
          initialValues={initialvalues}
          onSubmit={handleSubmit}
          validationSchema={ShippingSchema}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="address"
                component={TextField}
                label=" Address"
                placeholder="Enter your Address"
              />
              <Field
                type="text"
                name="city"
                component={TextField}
                label="City"
                placeholder="Enter your City"
              />
              <Field
                type="postal"
                name="pincode"
                component={TextField}
                label="Pincode"
                placeholder="Enter your Pincode"
              />
              <Field
                type="text"
                name="country"
                component={TextField}
                label="Country"
                placeholder="Enter your Country"
              />

              <Button type="submit" disabled={isSubmitting}>
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
