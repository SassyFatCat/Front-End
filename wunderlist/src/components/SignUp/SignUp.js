import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";
import * as yup from "yup";
import SignUpFormSchema from "./SignUpFormSchema";
import SigningPaper from "./paper-24.png";
import { useSpring, animated } from "react-spring";
import {Keyframes} from 'react-spring/renderprops'

const initialFormValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};
const initialFormErrors = {
  first_name: "",
  last_name: "",
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

  // This is animation below till the return
  const fade = useSpring({ opacity: 0, from: { opacity: 1 } });

// Will fade children in and out in a loop
// const Container = Keyframes.Spring({
//   // Single props
//   show: {opacity: 1},
//   // Chained animations (arrays)
//   showAndHide: [{opacity: 1}, {opacity: 0}],
//   // Functions with side-effects with access to component props
//   wiggle: async (next, cancel, ownProps) => {
//     await next({x: 100, config: config.wobbly})
//     await delay(1000)
//     await next({x: 0, config: config.gentle})
//   }
// })

  return (
    <div className="container">
      <div className="background"></div>
      <div className="formContainer">
        <h2 className="title">
          <animated.img className="contract" style={fade} src={SigningPaper}></animated.img>
          &nbsp;Sign up!&nbsp;
          <animated.img className="contract" style={fade} src={SigningPaper} />
        </h2>
        <form className="signUpForm" onSubmit={submit}>
          <div className="insideFormContainer">
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={values.first_name}
                onChange={inputValueChange}
              />
              <div className="error">
                <span>{formErrors.first_name}</span>
              </div>
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={values.last_name}
                onChange={inputValueChange}
              />
              <div className="error">
                <span>{formErrors.last_name}</span>
              </div>
            </label>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={inputValueChange}
              />
              <div className="error">
                <span>{formErrors.username}</span>
              </div>
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={inputValueChange}
              />
              <div className="error">
                <span>{formErrors.email}</span>
              </div>
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={inputValueChange}
              />
              <div className="error">
                <span>{formErrors.password}</span>
              </div>
            </label>
            <div>
              <button className="submitButton" disabled={disabled}>
                Submit
              </button>
            </div>
            <Link className="homeLink" to="/">
              Home
            </Link>
            {/* <div>
              <h1>{user.username}</h1>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
