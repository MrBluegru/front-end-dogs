import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import {
  resetDogs,
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

  const [activeBurger, setActiveBurger] = useState(false);

  const selectOrdNam = useRef(null);
  const selectOrdWei = useRef(null);
  const selectTemp = useRef(null);
  const selectBreed = useRef(null);

  useEffect(() => {
    if (allTempers.length === 0) {
      dispatch(getTempers());
    }
  }, [dispatch, allTempers.length]);

  const handlerReset = () => {
    dispatch(resetDogs());
    selectOrdNam.current.value = "init";
    selectOrdWei.current.value = "init";
    selectTemp.current.value = "init";
    selectBreed.current.value = "init";
  };

  const handleOrderName = (e) => {
    dispatch(orderByName(e.target.value));
    selectOrdWei.current.value = "init";
  };
  const handleOrderWeight = (e) => {
    dispatch(orderByWeight(e.target.value));
    selectOrdNam.current.value = "init";
  };
  const handleFilterTemper = (e) => {
    dispatch(filterTemper(e.target.value));
    selectBreed.current.value = "init";
  };
  const handleFilterBreed = (e) => {
    dispatch(filterBreed(e.target.value));
    selectOrdWei.current.value = "init";
    selectOrdNam.current.value = "init";
    selectTemp.current.value = "init";
  };

  const NavBarList = () => {
    return (
      <>
        <Link to={"/createNewDog"}>
          <button className="selectNavB"> New </button>
        </Link>
        <select
          ref={selectOrdNam}
          id="order-name"
          className="selectNavB"
          onChange={(e) => handleOrderName(e)}
        >
          <option hidden> Order </option>
          <option disabled="disabled" default={true} value="init">
            Order
          </option>
          <option value="asc"> Ascending (A-Z) </option>
          <option value="desc"> Descending (Z-A) </option>
        </select>

        <select
          ref={selectOrdWei}
          id="order-weight"
          className="selectNavB"
          onChange={(e) => handleOrderWeight(e)}
        >
          <option hidden> Weight </option>
          <option disabled="disabled" default={true} value="init">
            Weight
          </option>
          <option value="asc"> Ascending (0-9) </option>
          <option value="desc"> Descending (9-0) </option>
        </select>

        <select
          ref={selectTemp}
          id="temperament"
          className="selectNavB"
          onChange={(e) => handleFilterTemper(e)}
        >
          <option hidden> Temperament </option>
          <option disabled="disabled" default={true} value="init">
            Temperament
          </option>
          <option value="all"> All </option>
          {allTempers.map((e) => {
            return (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>

        <select
          ref={selectBreed}
          id="breed"
          className="selectNavB"
          onChange={(e) => handleFilterBreed(e)}
        >
          <option hidden> Breed </option>
          <option disabled="disabled" default={true} value="init">
            Breed
          </option>
          <option value="api"> Breed existent </option>
          <option value="db"> New breed </option>
        </select>
        {(selectBreed ?? selectOrdNam ?? selectTemp ?? selectOrdWei) && (
          <button className="selectNavB" onClick={handlerReset}>
            Reset
          </button>
        )}
        {activeBurger && (
          <button onClick={() => setActiveBurger(!activeBurger)}>
            <img src="/close.svg" className="close-burger" alt="icon close"/>
          </button>
        )}
      </>
    );
  };

  return (
    <div className="navbar">
      <Search />

      <div className={activeBurger ? "burger-nav" : "burger-hidden"}>
        <div className="backG-burgerNav">{NavBarList()}</div>
      </div>
      {!activeBurger && (
        <div
          className={"switch-burger"}
          onClick={() => setActiveBurger(!activeBurger)}
        ></div>
      )}

      <div className="navbar-hrz">{NavBarList()}</div>
    </div>
  );
};

export default Navbar;
