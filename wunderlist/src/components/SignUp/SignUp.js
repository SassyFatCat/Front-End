import React from "react";
import "./SignUp.css";


const SignUp = () => {
  return (
    <div id="container">
      <h3>If you do not have an account sign up!</h3>
      <form>
        <label>
          Username:
          <input type="text" placeholder="Username" />
        </label>
        <label>
          Email:
          <input type="email" placeholder="example@example.com" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
      </form>
    </div>
  );
};

export default SignUp;
