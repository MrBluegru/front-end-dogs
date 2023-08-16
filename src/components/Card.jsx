import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css";

const Card = ({ id, name, img, maxWeight, temperament, isPreview = false }) => {
  return (
    <div className="card" key={id}>
      <Link to={!isPreview ? `/${id}` : null}>
        <img
          className="imgCard"
          src={isPreview ? img : `https://cdn2.thedogapi.com/images/${img}.jpg`}
          alt={`Img of ${name}`}
        />

        <h1 className="nameCard">{name}</h1>

        <div>
          <p className="temperCard">Temperaments</p>
          <div className="tempersCard">
            {temperament.map((e) => {
              return <p key={e}>{e}</p>;
            })}
          </div>
        </div>

        <div className="title-maxh-weig">
          <p className="title-MaxH">Max-Weight</p>
          <p className="weightCard">{maxWeight ? maxWeight : `n/a`}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
