/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTempers, createDogs } from "../redux/action";
import CardCD from "../components/CardCD";
import "../styles/formCreate.css";

const FormCreate = () => {
  const dispach = useDispatch();
  const dogsT = useSelector((state) => state.tempers);
  let navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    image: "",
    minHeightCm: "",
    maxHeightCm: "",
    minWeightKg: "",
    maxWeightKg: "",
    minLifeSpanYears: "",
    maxLifeSpanYears: "",
    temper: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: parseInt(e.target.value),
    });
  }
  function handleChangeNI(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    if (!input.temper.includes(e.target.value)) {
      setInput({
        ...input,
        temper: [...input.temper, e.target.value],
      });
    }
    if (input.temper.includes(e.target.value)) {
      alert`You cannot add an already added temperament`;
    }
  }

  function handleDeletTemp(temperS) {
    setInput({
      ...input,
      temper: input.temper.filter((e) => e !== temperS),
    });
  }

  function newDog(e) {
    e.preventDefault();
    if (disableDesactivate !== undefined) {
      return alert(
        `Completa los datos solicitados para poder crear una nueva raza`
      );
    } else {
      dispach(createDogs(input));
      setInput({
        name: "",
        image: "",
        minHeightCm: "",
        maxHeightCm: "",
        minWeightKg: "",
        maxWeightKg: "",
        minLifeSpanYears: "",
        maxLifeSpanYears: "",
        temper: [],
      });
      navigate("/createDogOK", { replace: true });
    }
  }

  useEffect(() => {
    dispach(getTempers());
  }, [dispach]);

  //?Validacion///////////////////////////////////////////////////////////////
  const regexS = {
    espaciosIni: /^\s/, // eslint-disable-line
    caracteresEsp: /[^\s\w]/g, // eslint-disable-line
    numeros: /[^a-z ]\ *([.0-9])*\d/g, // eslint-disable-line
    url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi, // eslint-disable-line
  };

  const validacionName = (entrada) => {
    if (regexS.espaciosIni.test(entrada))
      return `No puede iniciar con espacios en blanco`;
    if (entrada.length <= 3) return `Nombre muy corto`;
    if (entrada.length > 30) return `Nombre muy largo`;
    if (regexS.numeros.test(entrada))
      return `No se admite numeros en este campo`;
    if (regexS.caracteresEsp.test(entrada))
      return `No se admite caracteres especiales en este campo`;
  };
  const validacionImg = (entrada) => {
    if (!regexS.url.test(entrada)) return `Debe ser una url valida`;
  };
  const validacionMinHeight = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return `Este campo debe completarse`;
    if (entrada1 < 15) return `El valor minimo no puede ser menor a 15 cm.`;
    if (entrada1 > 70) return `El valor minimo no puede ser mayor a 70 cm.`;
    if (entrada1 > entrada2) {
      return `El valor minimo no puede ser mayor que el valor maximo`;
    }
  };
  const validacionMaxHeigh = (entrada1, entrada2) => {
    if (isNaN(entrada2)) return `Este campo debe completarse`;
    if (entrada2 > 100) return `El valor maximo no puede ser mayor a 100 cm.`;
    if (entrada2 < entrada1) {
      return `El valor maximo no puede ser menor que el valor minimo`;
    }
  };
  const validacionMinWeight = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return `Este campo debe completarse`;
    if (entrada1 < 1) return `El valor minimo no puede ser menor a 1 kg.`;
    if (entrada1 > 70) return `El valor minimo no puede ser mayor a 70 Kg.`;
    if (entrada1 > entrada2) {
      return `El valor minimo no puede ser mayor que el valor maximo`;
    }
  };
  const validacionMaxWeight = (entrada1, entrada2) => {
    if (isNaN(entrada2)) return `Este campo debe completarse`;
    if (entrada2 > 100) return `El valor maximo no puede ser mayor a 100 Kg.`;
    if (entrada2 < entrada1) {
      return `El valor maximo no puede ser menor que el valor minimo`;
    }
  };
  const validacionTempers = (entrada) => {
    if (entrada.length < 1) {
      return `Se requiere que al menos tenga un temperamento`;
    }
    if (entrada.length > 15) {
      return `No se pueden seleccionar mas de 15 temperamentos`;
    }
  };
  const validacionMinLifeSpan = (entrada1, entrada2) => {
    if (isNaN(entrada1)) return `Este campo debe completarse`;
    if (entrada1 < 6) return `El valor minimo no puede ser menor a 6 años.`;
    if (entrada1 > 10) return `El valor minimo no puede ser mayor a 10 años.`;
    if (entrada1 > entrada2) {
      return `El valor minimo no puede ser mayor que el valor maximo`;
    }
  };
  const validacionMaxLifeSpan = (entrada1, entrada2) => {
    if (isNaN(entrada2)) return `Este campo debe completarse`;
    if (entrada2 > 16) return `El valor maximo no puede ser mayor a 16 años.`;
    if (entrada2 < entrada1) {
      return `El valor maximo no puede ser menor que el valor minimo`;
    }
  };

  const errorName = validacionName(input.name);
  const errorImg = validacionImg(input.image);
  const errorMinH = validacionMinHeight(input.minHeightCm, input.maxHeightCm);
  const errorMaxH = validacionMaxHeigh(input.minHeightCm, input.maxHeightCm);
  const errorMinW = validacionMinWeight(input.minWeightKg, input.maxWeightKg);
  const errorMaxW = validacionMaxWeight(input.minWeightKg, input.maxWeightKg);
  const errorTempers = validacionTempers(input.temper);
  const errorMinLSpan = validacionMinLifeSpan(
    input.minLifeSpanYears,
    input.maxLifeSpanYears
  );
  const errorMaxLSpan = validacionMaxLifeSpan(
    input.minLifeSpanYears,
    input.maxLifeSpanYears
  );

  const functionGeneral = (
    iName,
    iImg,
    iMinH,
    iMaxH,
    iMinW,
    iMaxW,
    iTemper,
    iMinLS,
    iMaxLS
  ) => {
    if (
      iName === undefined &&
      iImg === undefined &&
      iMinH === undefined &&
      iMaxH === undefined &&
      iMinW === undefined &&
      iMaxW === undefined &&
      iTemper === undefined &&
      iMinLS === undefined &&
      iMaxLS === undefined
    ) {
      return undefined;
    } else {
      return true;
    }
  };

  const disableDesactivate = functionGeneral(
    errorName,
    errorImg,
    errorMinH,
    errorMaxH,
    errorMinW,
    errorMaxW,
    errorTempers,
    errorMinLSpan,
    errorMaxLSpan
  );

  //?end/////////////////////////////////////////////////////////////////////////

  return (
    <div className="formCreate">
      <div className="titulo">
        <Link className="homeLink" to="/home">
          <button className="volver">🏠</button>
        </Link>
        <p className="title">New Dog</p>
      </div>

      <div className="threeColumns">
        <div className="imgColum1">
          {input.name ? (
            <CardCD
              id={input.name}
              name={input.name}
              img={input.image}
              maxWeight={input.maxWeightKg}
              temperament={input.temper}
            />
          ) : (
            ``
          )}
        </div>
        <div className="formmC2">
          <form className="createForm" onSubmit={(e) => newDog(e)}>
            <div className="nameF">
              <label>Name</label>
              <input
                id="name"
                type="text"
                name="name"
                className="inputFC"
                value={input.name}
                onChange={(e) => handleChangeNI(e)}
              />
              {input.name ? <p className="errorsMsj">{errorName}</p> : ``}
            </div>

            <div className="imgF">
              <label>Image</label>
              <input
                id="image"
                type="text"
                name="image"
                className="inputFC"
                value={input.image}
                onChange={(e) => handleChangeNI(e)}
              />
              {input.image ? <p className="errorsMsj">{errorImg}</p> : ``}
            </div>

            <p className="titleHeight">Height</p>

            <div className="minHF">
              <label>Min</label>
              <input
                id="minHeightCm"
                type="number"
                name="minHeightCm"
                className="inputFC"
                value={input.minHeightCm}
                onChange={(e) => handleChange(e)}
              />
              {input.minHeightCm ? <p className="errorsMsj">{errorMinH}</p> : ``}
            </div>

            <div className="maxHF">
              <label>Max</label>
              <input
                id="maxHeightCm"
                type="number"
                name="maxHeightCm"
                className="inputFC"
                value={input.maxHeightCm}
                onChange={(e) => handleChange(e)}
              />
              {input.maxHeightCm ? <p className="errorsMsj">{errorMaxH}</p> : ``}
            </div>

            <p className="titleWeight">Weight</p>

            <div className="minWf">
              <label>Min</label>
              <input
                id="minWeightKg"
                type="number"
                name="minWeightKg"
                className="inputFC"
                value={input.minWeightKg}
                onChange={(e) => handleChange(e)}
              />
              {input.minWeightKg ? <p className="errorsMsj">{errorMinW}</p> : ``}
            </div>

            <div className="maxWf">
              <label>Max</label>
              <input
                id="maxWeightKg"
                type="number"
                name="maxWeightKg"
                className="inputFC"
                value={input.maxWeightKg}
                onChange={(e) => handleChange(e)}
              />
              {input.maxWeightKg ? <p className="errorsMsj">{errorMaxW}</p> : ``}
            </div>

            <div className="temperF">
              {/* <label>Temperaments </label> */}
              <select
                id="temper"
                name="temper"
                className="selectFC"
                value={input.temper}
                onChange={(e) => handleSelect(e)}
              >
                <option hidden>Select a temperament</option>
                <option disabled="disabled" default={true} value="">
                  Select a temperament
                </option>
                {dogsT.map((e) => {
                  if (input.temper.length > 15) {
                    return (
                      <option key={e.name} disabled="disabled" default={true} value="">
                        Limite de 15 temperamentos alcanzado
                      </option>
                    );
                  } else if (!input.temper.includes(e.name)) {
                    return (
                      <option value={e.name} key={e.id}>
                        {e.name}
                      </option>
                    );
                  }
                })}
              </select>
              {/* {input.temper ? <p className="errorsMsj">{errorTempers}</p> : ``} */}
            </div>

            <p className="titleLS">Life Span</p>

            <div className="minLSf">
              <label>Min</label>
              <input
                id="minLifeSpanYears"
                type="number"
                name="minLifeSpanYears"
                className="inputFC"
                value={input.minLifeSpanYears}
                onChange={(e) => handleChange(e)}
              />
              {input.minLifeSpanYears ? <p className="errorsMsj">{errorMinLSpan}</p> : ``}
            </div>
            <div className="maxLSf">
              <label>Max</label>
              <input
                id="maxLifeSpanYears"
                type="number"
                name="maxLifeSpanYears"
                className="inputFC"
                value={input.maxLifeSpanYears}
                onChange={(e) => handleChange(e)}
              />
              {input.maxLifeSpanYears ? <p className="errorsMsj">{errorMaxLSpan}</p> : ``}
            </div>

            <div className="btnCf">
              <button
                className="btnSCF"
                type="submit"
                disabled={disableDesactivate}
              >
                Create
              </button>
            </div>
          </form>
        </div>
        {input.temper.length ? (
          <div className="tempersSelectsC3">
            <p>Selected Temperaments</p>
            {input.temper.map((e) => (
              <p key={e} onClick={() => handleDeletTemp(e)}>
                <button className="btnsTemps">{e}</button>
              </p>
            ))}
            <p>touch to remove</p>
          </div>
        ) : (
          ``
        )}
      </div>
    </div>
  );
};

export default FormCreate;
