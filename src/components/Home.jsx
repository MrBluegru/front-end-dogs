import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, clearDetails } from "../redux/action";
import Card from "./Card";
import Navbar from "./Navbar";
import Loading from "./Loading";
import Pagination from "./Pagination";
import SNotFound from "./SNotFound";
import "../styles/home.css";

const Home = () => {
  const dispach = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (allDogs.length === 0) {
      dispach(getDogs());
    }
    setCurrentPage(1);
    dispach(clearDetails());
  }, [dispach, allDogs]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDogs = currentPage * dogsPerPage;
  const indexOfFirstDogs = indexOfLastDogs - dogsPerPage;
  const currentDogs = allDogs.length
    ? allDogs.slice(indexOfFirstDogs, indexOfLastDogs)
    : [];

  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="home">
      <Link to={`/`}>
        <p className="title">Dogs APP</p>
      </Link>

      <Navbar />

      {error.length ? (
        <SNotFound />
      ) : currentDogs.length >= 1 ? (
        <div className="cards">
          {currentDogs.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                name={e.name}
                img={e.image}
                maxWeight={e.maxWeightKg}
                temperament={e.temperament}
              />
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
      {!error.length ? (
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      ) : null}
    </div>
  );
};

export default Home;
