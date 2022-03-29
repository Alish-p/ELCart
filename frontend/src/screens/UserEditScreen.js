import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { EditUserSchema } from '../Utils/ValidationSchema';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TextField from '../Utils/FormComponents/TextField';
import FormContainer from '../components/FormContainer';
import { useEffect } from 'react';
import { fetchUser, updateUser } from '../redux/Slices/UserList';
import CheckboxField from '../Utils/FormComponents/CheckboxField';

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { id } = useParams();

  const error = useSelector((state) => state.userList.error);
  const loading = useSelector((state) => state.userList.loading);
  const user = useSelector((state) => state.userList.currentUser);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  const initialvalues = {
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    dispatch(updateUser({ id, values }));
    setSubmitting(false);
  };

  return (
    <FormContainer>
      <h2 className="my-3 text-center"> Edit User </h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader size="sm" />}
      <Formik
        initialValues={initialvalues}
        onSubmit={handleSubmit}
        validationSchema={EditUserSchema}
        enableReinitialize
      >
        {({ isSubmitting, handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              type="name"
              name="name"
              component={TextField}
              label="Name "
              placeholder="Enter your name "
            />
            <Field
              type="email"
              name="email"
              component={TextField}
              label="Email"
              placeholder="Enter your Email Address"
            />

            <Field
              type="checkbox"
              name="isAdmin"
              handleChange={handleChange}
              component={CheckboxField}
              label="Is Admin ?"
              checked={values.isAdmin}
            />

            <Button type="submit" disabled={isSubmitting}>
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default UserEditScreen;
