import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/createdOk.css";

const CreateOk = () => {
  let navigate = useNavigate();

  function handleClick(e) {
    navigate("/createNewDog", { replace: true });
  }
  return (
    <div className="createOk">
      <p className="newD">New dog added successfully</p>
      <div className="btns">
        <Link to={`/home`}>
          <button className="btnGoH">Go back home</button>
        </Link>
          <button className="btnAdd" onClick={(e) => handleClick(e)}>Add 1+</button>
      </div>
    </div>
  );
};

export default CreateOk;
