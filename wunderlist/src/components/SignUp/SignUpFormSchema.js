import * as yup from 'yup'

const SignUpFormSchema = yup.object().shape({
    email: yup
      .string()
      .email('Must be a valid email address.')
      .required('Must include email address.'),
    username: yup
      .string()
      .min(3, 'Your username must be at least 3 characters long.')
      .required('Username is Required'),
    password: yup
      .string()
      .min(5,'Password must be at least 5 characters long!')
      .required('Password is Required'),
  });

  export default SignUpFormSchema