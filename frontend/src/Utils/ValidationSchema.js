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

export const validateConfirmPassword = (pass, value) => {
  let error = '';
  if (pass && value) {
    if (pass !== value) {
      error = 'Password not matched';
    }
  }
  return error;
};
