import React from "react";
import "../styles/cardCD.css";

const CardCD = ({ id, name, img, maxWeight, temperament }) => {
  return (
    <div className="card" key={id}>
        <p className="nameCard">{name}</p>

        <img className="divImgCard" src={img} alt={`Img of ${name}`} />

        <p className="temperCard">Temperaments</p>
        <div className="tempersCard">
          {temperament?.map((e) => {
            return <p>✔ {e}</p>;
          })}
        </div>
        <div>
          <p className="title-MaxH">Max-Weight</p>
          <p className="weightCard">{maxWeight ? maxWeight : `n/a`}</p>
        </div>
    </div>
  );
};

export default CardCD;
