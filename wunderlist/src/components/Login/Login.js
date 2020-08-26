import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "./Login.css";
import LoginformSchema from "./LoginformSchema";

const initialValues = {
  username: "",
  password: "",
};

const initialErrors = {
  username: "",
  password: "",
};
const initialDisabled = true;

const Login = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const thisUrl = "https://reqres.in/api/users";

  // const update = (name, value) => {
  //     const updateUser = {[name]: value, ...values}
  //     setValues(updateUser)

  // const onChange = (event) => {
  //   const { name, value } = event.target;
  //   update(name, value);
  // };

  const getUser = () => {
    axios
      .get(thisUrl)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log("check axios get");
      })

      .finally(() => {
        setValues(initialValues);
      });
  };

  const postUser = (thisUser) => {
    axios
      .post("https://reqres.in/api/users", thisUser)
      .then((res) => {
        setUserInfo([...userInfo, res.data]);
        console.log("axios post worked");
      })
      .catch((error) => {
        console.log("check axios post");
      });
  };

  const submit = () => {
    const thisUser = {
      username: values.username.trim(),
      password: values.password,
    };

    postUser(thisUser);
  };

  const inputValueChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    yup
      .reach(LoginformSchema, name)
      .validate(value)
      .then((valid) => {
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((error) => {
        setErrors({
          ...errors,
          [name]: error.errors[0],
        });
      });
  };

  useEffect(() => {
    //THis disables the submit button till it all the vorm validation fields are filled and validated
    LoginformSchema.isValid(values).then((valid) => {
      setDisabled(!valid);
    });
  }, [values]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="login"></div>
      <form className="loginContainer" onSubmit={submit}>
        <h2>Login Here</h2>
        <div className="loginInfo">
          <label>
            Username:
            <input
              value={values.username}
              onChange={inputValueChange}
              name="username"
              type="text"
              placeholder="type your username here"
            />
          </label>
          <label>
            Password:
            <input
              value={values.password}
              onChange={inputValueChange}
              name="password"
              type="text"
              placeholder="type your password here"
            />
          </label>
          <div>
            <button disabled={disabled} className="loginButton">Submit</button>
          </div>
        </div>

        <div className="myErrors">
          <div>{errors.username}</div>
          <div>{errors.password}</div>
        </div>

        <Link to="/" className="homeLink">
          Home
        </Link>
      </form>
    </>
  );
};
export default Login;
