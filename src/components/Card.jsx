import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";

const Card = ({ id, name, img, maxWeight, temperament }) => {
  return (
    <div className="card" key={id}>
      <Link className="linkCard" to={`/${id}`}>
        <p className="nameCard">{name}</p>

        <img className="divImgCard" src={img} alt={`Img of ${name}`} />

        <p className="temperCard">Temperaments</p>
        <div className="tempersCard">
          {temperament.map((e) => {
            return <p>✔ {e}</p>;
          })}
        </div>
        <div>
          <p className="title-MaxH">Max-Weight</p>
          <p className="weightCard">{maxWeight ? maxWeight : `n/a`}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
