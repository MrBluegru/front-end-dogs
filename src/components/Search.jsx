import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearError, getDogs, getDogsName } from "../redux/action";
import "../styles/search.css";

const Search = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    !e.target.value
      ? dispatch(getDogs())
      : dispatch(getDogsName(e.target.value));
    dispatch(clearError())
  };

  return (
    <div className="search">
      <form>
        <input
          className="searchInput"
          type="text"
          value={name || "" }
          placeholder=" 🔎 typing to search..."
          onChange={(e) => handleChange(e)}
        />
      </form>
    </div>
  );
};

export default Search;
