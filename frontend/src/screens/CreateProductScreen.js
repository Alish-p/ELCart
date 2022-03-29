import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { EditProductSchema, EditSchema } from '../Utils/ValidationSchema';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TextField from '../Utils/FormComponents/TextField';
import FormContainer from '../components/FormContainer';
import { useEffect } from 'react';
import { createProduct, resetUpdated } from '../redux/Slices/ProductList';
import { Link } from 'react-router-dom';

const CreateProductScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const error = useSelector((state) => state.productItem.error);
  const loading = useSelector((state) => state.productItem.loading);

  const updated = useSelector((state) => state.productList.updated);

  useEffect(() => {
    if (updated) {
      Navigate('/admin/productlist');
    }

    // cleanup
    return dispatch(resetUpdated());
  }, [updated]);

  const initialvalues = {
    name: 'Sample Name',
    price: 0,
    countInStock: 0,
    description: 'Sample Description',
    image: 'Sample Image',
    brand: 'Sample Brand',
    category: 'Sample category',
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    dispatch(createProduct({ product: values }));
    setSubmitting(false);
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h2 className="my-3 text-center"> Create Product </h2>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader size="sm" />}
        <Formik
          initialValues={initialvalues}
          onSubmit={handleSubmit}
          validationSchema={EditProductSchema}
          enableReinitialize
        >
          {({ isSubmitting, handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="name"
                component={TextField}
                label="Name"
                placeholder="Enter name"
              />
              <Field
                type="number"
                name="price"
                component={TextField}
                label="Price"
                placeholder="Enter Price"
              />

              <Field
                type="text"
                name="image"
                component={TextField}
                label="Image"
                placeholder="Upload Image"
              />

              <Field
                type="text"
                name="brand"
                component={TextField}
                label="Brand"
                placeholder="Enter Brand"
              />

              <Field
                type="number"
                name="countInStock"
                component={TextField}
                label="Count In Stock"
              />

              <Field
                type="text"
                name="category"
                component={TextField}
                label="Category"
              />

              <Field
                type="text"
                name="description"
                component={TextField}
                label="Description"
              />

              <Button type="submit" disabled={isSubmitting}>
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};

export default CreateProductScreen;
