import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import {
  getDogs,
  getTempers,
  orderByName,
  orderByWeight,
  filterTemper,
  filterBreed,
} from "../redux/action";
import "../styles/navBar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const allTempers = useSelector((state) => state.tempers);

  useEffect(() => {
    dispatch(getTempers());
  }, [dispatch]);

  const handlerClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
    window.location.replace("");
  };

  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };
  const handleOrderWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
  };
  const handleFilterTemper = (e) => {
    e.preventDefault();
    dispatch(filterTemper(e.target.value));
  };
  const handleFilterBreed = (e) => {
    e.preventDefault();
    dispatch(filterBreed(e.target.value));
  };

  return (
    <div className="navbar">
      <Search />

      <button className="selectNavB" onClick={(e) => handlerClick(e)}>
        All dogs
      </button>
      <Link to={"/createNewDog"}>
        <button className="selectNavB">Create new dog</button>
      </Link>
      <select className="selectNavB" onChange={(e) => handleOrderName(e)}>
        <option hidden> Order by name </option>
        <option disabled="disabled" default={true} value="">
          Order by name
        </option>
        <option value="asc"> Ascending (A-Z) </option>
        <option value="desc"> Descending (Z-A) </option>
      </select>

      <select className="selectNavB" onChange={(e) => handleOrderWeight(e)}>
        <option hidden> Order by weight </option>
        <option disabled="disabled" default={true} value="">
          Order by weight
        </option>
        <option value="asc"> Ascending (0-9) </option>
        <option value="desc"> Descending (9-0) </option>
      </select>

      <select className="selectNavB" onChange={(e) => handleFilterTemper(e)}>
        <option hidden> Filter by temperament</option>
        <option disabled="disabled" default={true} value="">
          Filter by temperament
        </option>
        <option value="all"> All </option>
        {allTempers.map((e) => {
          return <option key={e.name} value={e.name}>{e.name}</option>;
        })}
      </select>

      <select className="selectNavB" onChange={(e) => handleFilterBreed(e)}>
        <option hidden> Filter by breed </option>
        <option disabled="disabled" default={true} value="">
          Filter by breed
        </option>
        <option value="api"> Breed existent </option>
        <option value="db"> New breed </option>
      </select>
    </div>
  );
};

export default Navbar;
