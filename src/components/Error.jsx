import React from "react";
import { Link } from "react-router-dom";
import "../styles/errorC.css";

const ErrorC = () => {
  return (
    <div className="errorC">
      <div className="blurDiv-errorC">
        <p className="title-errorC">Page Not Found</p>
        <p className="message-errorC">
          We couldn't find what you were looking for.
        </p>
        <Link to={`/home`}>
          <button className="goBack-errorC">Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorC;
