import React, { useState, useEffect } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import SignUpFormSchema from "./SignUpFormSchema";
import SigningPaper from "./paper-24.png";
import { useSpring, animated, interpolate } from "react-spring";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

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
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [values, setValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled);

  const submit = (event) => {
    //This takes the data when it is submited.
    event.preventDefault();
    const newUser = {
      firstname: values.first_name.trim(),
      lastname: values.last_name.trim(),
      username: values.username.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };
    postNewUser(newUser);
  };

  const postNewUser = (newUser) => {
    //This posts data to the api which then should be used to login.
    axiosWithAuth
      .post("/user/register", newUser)
      .then((res) => {
        localStorage.setItem("token", res.data);
        history.push("/dashboard"); //this sends the user to the dashboard once they sign up
        console.log(res.data);
      })
      .catch((err) => {
        alert("Sign Up Failed!");
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

  // This is animation stuff below till the return

  const { o, xyz, color } = useSpring({
    from: { o: 0, xyz: [0, 0, 0], color: "#16425B" },
    o: 0.95,
    xyz: [10, 20, 5],
    color: "white",
  });

  return (
    <>
      <div className="background"></div>
      <form className="signUpForm" onSubmit={submit}>
        <animated.div
          className="formContainer"
          style={{
            color,
            background: o.interpolate((o) => `rgba(22,66,91, ${o})`),
            transform: xyz.interpolate(
              (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`
            ),
            border: interpolate([o, color], (o, c) => `${o * 10}px solid ${c}`),
            padding: o
              .interpolate({ range: [4, 0.2, 5], output: [0, 0, 10] })
              .interpolate((o) => `${o}%`),
            borderColor: o.interpolate({
              range: [0, 1],
              output: ["blue", "#81C3D7"],
            }),
            opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
          }}
        >
          <h2 className="title">Sign up!</h2>

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
              <div className="spacer"></div>
            </div>
            <Link className="homeLink" to="/">
              Home
            </Link>
          </div>
        </animated.div>
      </form>
    </>
  );
};

export default SignUp;
