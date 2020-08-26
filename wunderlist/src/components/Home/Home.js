// LIBRARIES, UTILITIES, CSS

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useSpring, animated, interpolate } from "react-spring";

const Home = () => {
  const { o, xyz, color } = useSpring({
    from: { o: 0, xyz: [0, 0, 0], color: "#16425B" },
    o: 0.95,
    xyz: [10, 20, 5],
    color: "white",
  });

  return (
    <div className="homeContainer">
      <div id="background"></div>
      <animated.div
        id="title"
        style={{
          color,
          background: o.interpolate((o) => `rgba(22,66,91, ${o})`),
          border: interpolate([o, color], (o, c) => `${o * 10}px solid ${c}`),
          padding: o
            .interpolate({ range: [0, 0.5, 1], output: [0, 0, 10] })
            .interpolate((o) => `${o}%`),
          borderColor: o.interpolate({
            range: [0, 1],
            output: ["blue", "#81C3D7"],
          }),
          opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1]),
        }}
      >
        <div className="homeContent" >
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
      </animated.div>
    </div>
  );
};

export default Home;
