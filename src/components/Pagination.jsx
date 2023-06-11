// import React from "react";
// import "../styles/pagination.css";

// export default function Pagination({
//   dogsPerPage,
//   allDogs,
//   paginado,
//   currentPage,
// }) {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   let pageLength = pageNumbers.length;

//   return (
//     <div className="page-item">
//       <button
//         className="nex-previous"
//         onClick={() =>
//           paginado(currentPage === 1 ? currentPage : currentPage - 1)
//         }
//       >{`🢤`}</button>

//       {pageNumbers?.map((e) => {
//         return (
//           <button
//             onClick={() => paginado(e)}
//             key={e}
//             className={e === currentPage ? "current" : "rest"}
//           >
//             {e}
//           </button>
//         );
//       })}

//       <button
//         className="nex-previous"
//         onClick={() =>
//           paginado(currentPage === pageLength ? currentPage : currentPage + 1)
//         }
//       >{`🢥`}</button>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../styles/pagination.css";

export default function Pagination({
  dogsPerPage,
  allDogs,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pageLength = pageNumbers.length;
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (
      !isNaN(value) &&
      parseInt(value) >= 1 &&
      parseInt(value) <= pageLength
    ) {
      setInputValue(value);
    }
  };

  const handleSubmit = () => {
    if (inputValue !== "") {
      paginado(parseInt(inputValue));
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="page-item">
      <button
        className={currentPage === 1 ? "blocked" : "nex-previous"}
        onClick={() =>
          paginado(currentPage === 1 ? currentPage : currentPage - 1)
        }
        disabled={currentPage === 1}
      >
        {"🢤"}
      </button>

      <div className="inpt-text-pagination">
        <input
          type="text"
          className="input-paginationC"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <p style={{ fontWeight: "bold" }}>{`of ${pageLength}`}</p>
      </div>

      <button className="btn-go-pagination" onClick={handleSubmit}>
        Go
      </button>

      <button
        className={currentPage === pageLength ? "blocked" : "nex-previous"}
        onClick={() =>
          paginado(currentPage === pageLength ? currentPage : currentPage + 1)
        }
        disabled={currentPage === pageLength}
      >
        {"🢥"}
      </button>
    </div>
  );
}
