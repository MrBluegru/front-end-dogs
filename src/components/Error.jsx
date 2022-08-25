import React from "react";
import { Link } from "react-router-dom";
import "../styles/errorC.css"

const ErrorC = () => {
  return (
    <div className="errorC">
      <p className="nro1">Page Not Found</p>
      <p className="nro2">We couldn't find what you were looking for.</p>
      <Link to={`/home`}>
        <button className="nro3">Go back</button>
      </Link>
    </div>
  );
};

export default ErrorC;
