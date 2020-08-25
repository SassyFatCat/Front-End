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
        <p className="motto">Your new favorite to-do list.</p>
        <Link className="links" to="/login">Login</Link>
        <Link className="links" to="/signup">Sign Up!</Link>
      </div>
    </div>
  );
};

export default Home;
