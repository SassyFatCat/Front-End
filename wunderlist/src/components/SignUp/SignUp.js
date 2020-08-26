import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";
import * as yup from "yup";
import SignUpFormSchema from "./SignUpFormSchema";


const initialFormValues = {
  username: "",
  email: "",
  password: "",
};
const initialFormErrors = {
  username: "",
  email: "",
  password: "",
};
const initialDisabled = true;

const SignUp = () => {
  const [user, setUser] = useState([]);
  const [values, setValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled);

  const submit = (event) => {
    //This takes the data when it is submited.
    event.preventDefault();
    const newUser = {
      username: values.username.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };
    postNewUser(newUser);
  };

  const postNewUser = (newUser) => {
    //This posts data to the api which then should be used to login.
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValues(initialFormValues);
      });
  };

  const inputValueChange = (event) => {
    const { name, value } = event.target;

    yup
      .reach(SignUpFormSchema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
      returned from yup (that we created in our schema) */
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    //THis disables the submit button till it all the vorm validation fields are filled and validated
    SignUpFormSchema.isValid(values).then((valid) => {
      setDisabled(!valid);
    });
  }, [values]);

  return (
    <div className="container">
      <div className="background"></div>
      <div className="formContainer">
        <h2 className="title">Sign up!</h2>
        <form className="signUpForm" onSubmit={submit}>
          <div className="insideFormContainer">
            <label>
              <div className="error">{formErrors.username}</div>
              Username:
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={inputValueChange}
              />
            </label>
            <label>
              <div className="error">{formErrors.email}</div>
              Email:
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={inputValueChange}
              />
            </label>
            <label>
              <div className="error">{formErrors.password}</div>
              Password:
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={inputValueChange}
              />
            </label>
            <div>
              <button className="submitButton" disabled={disabled}>
                Submit
              </button>
            </div>
            <Link className="homeLink" to="/">
              Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
