import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link } from "react-router-dom";

const initialFormValues = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [user, setUser] = useState([]);
  const [values, setValues] = useState(initialFormValues);

  const submit = (event) => {
    event.preventDefault();
    const newUser = {
      username: values.username.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };
    postNewUser(newUser);
  };

  const postNewUser = (newUser) => {
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
    const {name,value} = event.target
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div id="container">
      <h2>Don't have an account? Sign up!</h2>
      <Link to="/">Home</Link>
      <form onSubmit={submit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={values.username}
            onChange={inputValueChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={values.email}
            onChange={inputValueChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={inputValueChange}
          />
        </label>
        <button>Submit</button>
      </form>
      {/* REMOVE THE CODE BELOW LATER */}
      <div>
        REMOVE THIS LATER
        <h1>{user.username}</h1>
        <h1>{user.email}</h1>
        <h1>{user.password}</h1>
      </div>
    </div>
  );
};

export default SignUp;
