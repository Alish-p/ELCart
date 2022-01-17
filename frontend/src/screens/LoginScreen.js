import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { LoginSchema } from '../Utils/ValidationSchema';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { loginUser } from '../redux/Slices/User';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TextField from '../Utils/FormComponents/TextField';
import FormContainer from '../components/FormContainer';
import { useEffect } from 'react';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '';

  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const { _id } = useSelector((state) => state.user.userInfo);

  console.log(_id);

  useEffect(() => {
    if (_id) {
      console.log('calling from ');
      console.log(_id);
      Navigate(`/${redirect}`);
    }
  }, [searchParams, _id]);

  const initialvalues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values));
    setSubmitting(false);
  };

  return (
    <FormContainer>
      <h2 className="my-3 text-center">User Login</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader size="sm" />}
      <Formik
        initialValues={initialvalues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              type="email"
              name="email"
              component={TextField}
              label="Email Address"
              placeholder="Enter your Email Address"
            />
            <Field
              type="password"
              name="password"
              component={TextField}
              label="Password"
              placeholder="Enter your password"
            />

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Row className="py-3">
              <Col>
                New Customer?{' '}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default LoginScreen;
