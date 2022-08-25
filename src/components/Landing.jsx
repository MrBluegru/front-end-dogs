import { Link } from "react-router-dom";
import "../styles/landing.css";

import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="welc">
        <p>Welcome to Dogs App</p>
      </div>

      <div >
        <Link to={`/home`}>
          <button className="go">Start</button>
        </Link>
      </div>

      <div className="by">
        <a 
          className="linkA"
          href="https://www.linkedin.com/in/mrbluegru/"
          target="_blank"
          rel="noreferrer"
        >
          by Mr. Blue
        </a>
      </div>
    </div>
  );
};

export default Landing;
