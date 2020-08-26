import * as yup from "yup";

const SignUpFormSchema = yup.object().shape({
  first_name:yup
  .string()
  .required("First name is required"),
  last_name:yup
  .string()
  .required("Last name is required"),
  email: yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  username: yup
    .string()
    .min(6, "Your username must be 6 characters.")
    .required("Username is Required"),
  password: yup
    .string()
    .min(6, "Password must be 6 characters!")
    .required("Password is Required"),
});

export default SignUpFormSchema;
