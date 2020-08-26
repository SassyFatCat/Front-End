// LIBRARIES, UTILITIES, CSS

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div id="background"></div>
      <div id="title">
        <h1>
          Wunderlist<span id="copyright">©</span>
        </h1>
        <p>Your new favorite to-do list.</p>
        <div className="linkContainer">
          <span>
            Have an account?{" "}
            <Link className="links" to="/login">
              Login
            </Link>
          </span>
          <span>
            Dont have an account?{" "}
            <Link className="links" to="/signup">
              Sign Up!
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
