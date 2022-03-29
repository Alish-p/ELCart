import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import {
  LoginSchema,
  PaymentSchema,
  ShippingSchema,
} from '../Utils/ValidationSchema';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { savePaymentMethod } from '../redux/Slices/Cart';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import RadioField from '../Utils/FormComponents/RadioButton';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '';

  const error = useSelector((state) => state.cart.error);
  const loading = useSelector((state) => state.cart.loading);
  const shipping = useSelector((state) => state.cart.shippingAddress);

  useEffect(() => {
    if (!shipping) {
      Navigate('/shipping');
    }
  }, [shipping]);

  const initialvalues = {
    payment: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(savePaymentMethod(values));
    setSubmitting(false);
    Navigate('/placeorder');
  };
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <CheckoutSteps step1 step2 step3 />
        </Col>
      </Row>
      <FormContainer>
        <h2 className="my-3 text-center">Payment</h2>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader size="sm" />}
        <Formik
          initialValues={initialvalues}
          onSubmit={handleSubmit}
          validationSchema={PaymentSchema}
        >
          {({ isSubmitting, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="payment"
                component={RadioField}
                label="Payment Method"
                handleChange={handleChange}
                options={[
                  { label: 'Paypal', value: 'Paypal' },
                  { label: 'Stripe', value: 'Stripe' },
                  { label: 'Razorpay', value: 'Razorpay' },
                ]}
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

export default PaymentScreen;
