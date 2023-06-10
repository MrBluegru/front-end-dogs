import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/createdOk.css";

const CreateOk = () => {
  let navigate = useNavigate();

  return (
    <div className="createOk">
      <div className="back-createOk">
        <p className="newD">New dog added successfully</p>
        <div className="btns">
          <Link to={`/home`}>
            <button className="btnGoH">Go back home</button>
          </Link>
          <button
            className="btnAdd"
            onClick={() => navigate("/createNewDog", { replace: true })}
          >
            Add 1+
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOk;
