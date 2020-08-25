import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Username must be at least 6 characters long.")

    .required("Must include username."),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is Required"),
});

export default formSchema;
