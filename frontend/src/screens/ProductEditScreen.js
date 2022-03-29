import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { EditProductSchema } from '../Utils/ValidationSchema';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TextField from '../Utils/FormComponents/TextField';
import FormContainer from '../components/FormContainer';
import { useEffect, useState } from 'react';
import { fetchUser, updateUser } from '../redux/Slices/UserList';
import { resetUpdated, updateProduct } from '../redux/Slices/ProductList';
import { fetchProduct } from '../redux/Slices/ProductItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UploadField from '../Utils/FormComponents/UploadField';

const ProductEditScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { id } = useParams();

  const error = useSelector((state) => state.productItem.error);
  const loading = useSelector((state) => state.productItem.loading);
  const product = useSelector((state) => state.productItem.product);
  const updated = useSelector((state) => state.productList.updated);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (updated) {
      Navigate('/admin/productlist');
    }
    dispatch(fetchProduct(id));

    // cleanup
    return dispatch(resetUpdated());
  }, [updated, id]);

  const initialvalues = {
    price: product.price,
    countInStock: product.countInStock,
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand,
    category: product.category,
  };

  const uploadFileHandler = async (e, setFieldValue) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      console.log(data);

      // setImage(data);
      setFieldValue('image', data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    dispatch(updateProduct({ id, product: values }));
    setSubmitting(false);
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h2 className="my-3 text-center"> Edit Product </h2>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader size="sm" />}
        <Formik
          initialValues={initialvalues}
          onSubmit={handleSubmit}
          validationSchema={EditProductSchema}
          enableReinitialize
        >
          {({ isSubmitting, handleSubmit, setFieldValue }) => (
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
                // component={TextField}
                component={UploadField}
                uploadFileHandler={(e) => {
                  uploadFileHandler(e, setFieldValue);
                }}
                label="Image"
                placeholder="Enter Image URL"
                uploading={uploading}
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
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
