import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is Required')
    .email('Please Provide valid Email Address'),
  password: Yup.string()
    .min(5, 'Password should have 5 to 10 characters')
    .max(10, 'Password should have 5 to 10 characters')
    .required('Password is Required'),
});
export const EditUserSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is Required')
    .email('Please Provide valid Email Address'),
  name: Yup.string().required('Name is required'),
});
export const EditProductSchema = Yup.object().shape({
  price: Yup.number().required('Price is Required'),
  countInStock: Yup.number().required('Count In Stock is Required'),
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string().required('Image is required'),
  brand: Yup.string().required('Brand is required'),
  category: Yup.string().required('Category is required'),
});

export const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is Required')
    .email('Please Provide valid Email Address'),
  password: Yup.string()
    .min(5, 'Password should have 5 to 10 characters')
    .max(10, 'Password should have 5 to 10 characters')
    .required('Password is Required'),
  confirmPassword: Yup.string()
    .min(5, 'Password should have 5 to 10 characters')
    .max(10, 'Password should have 5 to 10 characters')
    .required('Password is Required'),
});

export const ShippingSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is Required'),
  country: Yup.string()
    .max(10, 'Country should have max 10 characters')
    .required('Country is Required'),
  pincode: Yup.string()
    .required('Pincode is Required')
    .matches(/^\d{1,6}$/, 'Pincode should have 6 digits'),
});
export const PaymentSchema = Yup.object().shape({
  payment: Yup.string().required('Payment method is required'),
});

export const validateConfirmPassword = (pass, value) => {
  let error = '';
  if (pass && value) {
    if (pass !== value) {
      error = 'Password not matched';
    }
  }
  return error;
};
