import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsId } from "../redux/action";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorC from "../components/Error";
import "../styles/details.css";

const Details = () => {
  const { id } = useParams();
  const dispach = useDispatch();
  const dogsDet = useSelector((state) => state.dogsDetails);

  useEffect(() => {
    dispach(getDogsId(id));
  }, [dispach, id]);

  if (dogsDet !== `Non-existent`) {
    return (
      <div className="details-container">
        {Object.entries(dogsDet).length ? (
          <div className="details-card">
            <img
              className="imgD"
              src={
                dogsDet.id.length > 10
                  ? dogsDet.image
                  : `https://cdn2.thedogapi.com/images/${dogsDet.image}.jpg`
              }
              alt={`Img of ${dogsDet.name}`}
            />
            <div className="info-details">
              <p className="nameTitle">{dogsDet.name}</p>

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

              <p className="temperText">Temperaments</p>
              <div className="temperG">
                {dogsDet.temperament?.map((e) => {
                  return <p key={e}> {e}</p>;
                })}
              </div>

              <div className="lifeSD">
                <p>
                  Life Span {dogsDet.minLifeSpanYears} -{" "}
                  {dogsDet.maxLifeSpanYears} years
                </p>
              </div>
              <div className="btn-details-gB">
                <Link to={"/home"}>
                  <button className="btnB">↩</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  } else {
    return <ErrorC />;
  }
};

export default Details;
