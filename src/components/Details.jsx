import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsId } from "../redux/action";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading"
import "../styles/details.css";

const Details = () => {
  const { id } = useParams();
  const dispach = useDispatch();
  const dogsDet = useSelector((state) => state.dogsDetails);

  useEffect(() => {
    dispach(getDogsId(id));
  }, [dispach, id]);

  return (
    <div className="detailsD">
      {Object.entries(dogsDet).length ?(<div className="detaisS">
        <div className="titleBtn">
          <Link to={"/home"}>
            <button className="btnB">↩</button>
          </Link>
          <p className="nameTitle">{dogsDet.name}</p>
        </div>
        <img
          className="imgD"
          src={dogsDet.image}
          alt={`Pic of ${dogsDet.name}`}
        />
        <div className="hAndW">

          <div className="hDg">
            <p>cm. {dogsDet.minHeightCm}</p>
            <p className="hwText">⇣ Height ⇡</p>
            <p>cm. {dogsDet.maxHeightCm}</p>
          </div>

          <div className="wDg">
            <p>kg. {dogsDet.minWeightKg}</p>
            <p className="hwText">▼ Weight ▲</p>
            <p>kg. {dogsDet.maxWeightKg}</p>
          </div>
        </div>

        <p className="temperText">Temperament</p>
        <div className="temperG">
          {dogsDet.temperament?.map((e) => {
            return <p> ✔ {e}</p>;
          })}
        </div>
        <div className="lifeSD">
          <p>Life Span {dogsDet.minLifeSpanYears} - {dogsDet.maxLifeSpanYears} years</p>
        </div>
      </div>):<Loading/>}
    </div>
  );
};

export default Details;
