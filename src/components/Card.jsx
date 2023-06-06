import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";

const Card = ({ id, name, img, maxWeight, temperament }) => {
  return (
    <Link to={`/${id}`}>
      <div className="card" key={id}>
        <img className="divImgCard" src={img} alt={`Img of ${name}`} />

        <h1 className="nameCard">{name}</h1>

        <div>
          <p className="temperCard">Temperaments</p>
          <div className="tempersCard">
            {temperament.map((e) => {
              return <p>✔ {e}</p>;
            })}
          </div>
        </div>
        <div className="title-maxh-weig">
          <p className="title-MaxH">Max-Weight</p>
          <p className="weightCard">{maxWeight ? maxWeight : `n/a`}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
