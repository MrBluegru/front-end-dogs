import { Link } from "react-router-dom";
import by from "../img/Letras_blanca.png";
import "../styles/landing.css";

import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="title-landing">
        <p>Welcome to Dogs App</p>
      </div>

      <Link to={`/home`}>
        <button className="btn_go">Start</button>
      </Link>

      <a
        href="https://www.linkedin.com/in/mrbluegru/"
        target="_blank"
        rel="noreferrer"
      >
        <img className="imglogo" src={by} alt="by mr. blue" />
      </a>
    </div>
  );
};

export default Landing;
