import { Link } from "react-router-dom";
import by from "../img/R03M.png";
import "../styles/landing.css";

import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="content_L">
        <h1 className="title-landing">Welcome to Dogs App</h1>

        <Link to={`/home`}>
          <button className="btn_go">Start</button>
        </Link>

        <a
          href="https://www.linkedin.com/in/R03M/"
          target="_blank"
          rel="noreferrer"
          className="goToLinkedin"
        >
          <img  src={by} alt="by R03M" />
        </a>
      </div>
    </div>
  );
};

export default Landing;
