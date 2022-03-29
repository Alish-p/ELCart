import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Formik, Field } from 'formik';
import {
  SignupSchema,
  validateConfirmPassword,
} from '../Utils/ValidationSchema';
import { register } from '../redux/Slices/User';
import Message from '../components/Message';
import TextField from '../Utils/FormComponents/TextField';
import FormContainer from '../components/FormContainer';
import { useEffect } from 'react';
import Loader from '../components/Loader';

const SignUp = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '';

  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const { _id } = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (_id) {
      Navigate(`/${redirect}`);
    }
  }, [searchParams, _id]);

  const initialvalues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(register(values));
    setSubmitting(false);
  };

  return (
    <FormContainer>
      <h2 className="mt-3 mb-5 text-center">User Register</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Formik
        initialValues={initialvalues}
        onSubmit={handleSubmit}
        validationSchema={SignupSchema}
      >
        {({ isSubmitting, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            <Field type="text" name="name" component={TextField} label="Name" />
            <Field
              type="email"
              name="email"
              component={TextField}
              label="Email Address"
            />
            <Field
              type="password"
              name="password"
              component={TextField}
              label="Password"
            />

            <Field
              type="password"
              name="confirmPassword"
              component={TextField}
              label="Confirm Password"
              validate={(value) =>
                validateConfirmPassword(values.password, value)
              }
            />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Row className="py-3">
              <Col>
                Existing User?
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Sign In
                </Link>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default SignUp;
