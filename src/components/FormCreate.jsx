/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTempers, createDogs } from "../redux/action";
import Card from "../components/Card";
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

  const validacionName = (input) => {
    if (regexS.espaciosIni.test(input))
      return `Cannot start with blank spaces`;
    if (input.length <= 3) return `Very short name`;
    if (input.length > 30) return `Very long name`;
    if (regexS.numeros.test(input))
      return `Numbers are not allowed in this field`;
    if (regexS.caracteresEsp.test(input))
      return `Special characters are not allowed in this field`;
  };
  const validacionImg = (input) => {
    if (!regexS.url.test(input)) return `Must be a valid url`;
  };
  const validacionMinHeight = (input1, input2) => {
    if (isNaN(input1)) return `This field must be completed`;
    if (input1 < 15) return `The minimum value cannot be less than 15 cm.`;
    if (input1 > 70) return `The minimum value cannot be greater than 70 cm.`;
    if (input1 > input2) {
      return `The minimum value cannot be greater than the maximum value`;
    }
  };
  const validacionMaxHeigh = (input1, input2) => {
    if (isNaN(input2)) return `This field must be completed`;
    if (input2 > 100) return `The maximum value cannot be greater than 100 cm.`;
    if (input2 < input1) {
      return `The maximum value cannot be less than the minimum value`;
    }
  };
  const validacionMinWeight = (input1, input2) => {
    if (isNaN(input1)) return `This field must be completed`;
    if (input1 < 1) return `The minimum value cannot be less than 1 kg.`;
    if (input1 > 70) return `The minimum value cannot be greater than 70 Kg.`;
    if (input1 > input2) {
      return `The minimum value cannot be greater than the maximum value`;
    }
  };
  const validacionMaxWeight = (input1, input2) => {
    if (isNaN(input2)) return `This field must be completed`;
    if (input2 > 100) return `The maximum value cannot be greater than 100 Kg.`;
    if (input2 < input1) {
      return `The maximum value cannot be less than the minimum value`;
    }
  };
  const validacionTempers = (input) => {
    if (input.length < 1) {
      return `It is required that you at least have a temperament`;
    }
    if (input.length > 15) {
      return `You cannot select more than 15 temperaments`;
    }
  };
  const validacionMinLifeSpan = (input1, input2) => {
    if (isNaN(input1)) return `This field must be completed`;
    if (input1 < 6) return `The minimum value cannot be less than 6 years`;
    if (input1 > 10) return `The minimum value cannot be greater than 10 years`;
    if (input1 > input2) {
      return `The minimum value cannot be greater than the maximum value`;
    }
  };
  const validacionMaxLifeSpan = (input1, input2) => {
    if (isNaN(input2)) return `This field must be completed`;
    if (input2 > 16) return `The maximum value cannot be greater than 16 years`;
    if (input2 < input1) {
      return `The maximum value cannot be less than the minimum value`;
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
      <div className="title-btn-create">
        <Link to="/home">
          <button className="goBack-create">🏠</button>
        </Link>
        <p className="title-form-create">New Dog</p>
      </div>

      <div className="threeColumns">
        <form className="createForm" onSubmit={(e) => newDog(e)}>
          <div className="nameF">
            <label className="subtitle-formFC">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="inputFC"
              value={input.name}
              onChange={(e) => handleChangeNI(e)}
            />
          </div>
          <div className="error-containerFC">
            {input.name ? <p className="errorsMsj">{errorName}</p> : ``}
          </div>

          <div className="imgF">
            <label className="subtitle-formFC">Image</label>
            <input
              id="image"
              type="text"
              name="image"
              className="inputFC"
              value={input.image}
              onChange={(e) => handleChangeNI(e)}
            />
          </div>

          <div className="error-containerFC">
            {input.image ? <p className="errorsMsj">{errorImg}</p> : ``}
          </div>

          <p className="subtitle-formFC">Height</p>

          <div className="min-max-heightFC">
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
            </div>
            <div className="error-containerFC">
              {input.minHeightCm ? (
                <p className="errorsMsj">{errorMinH}</p>
              ) : (
                ``
              )}
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
            </div>
            <div className="error-containerFC">
              {input.maxHeightCm ? (
                <p className="errorsMsj">{errorMaxH}</p>
              ) : (
                ``
              )}
            </div>
          </div>

          <p className="subtitle-formFC">Weight</p>

          <div className="min-max-weightFC">
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
            </div>
            <div className="error-containerFC">
              {input.minWeightKg ? (
                <p className="errorsMsj">{errorMinW}</p>
              ) : (
                ``
              )}
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
            </div>
            <div className="error-containerFC">
              {input.maxWeightKg ? (
                <p className="errorsMsj">{errorMaxW}</p>
              ) : (
                ``
              )}
            </div>
          </div>

          <p className="subtitle-formFC">Life Span</p>

          <div className="min-max-lifeSFC">
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
            </div>
            <div className="error-containerFC">
              {input.minLifeSpanYears ? (
                <p className="errorsMsj">{errorMinLSpan}</p>
              ) : (
                ``
              )}
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
            </div>
            <div className="error-containerFC">
              {input.maxLifeSpanYears ? (
                <p className="errorsMsj">{errorMaxLSpan}</p>
              ) : (
                ``
              )}
            </div>
          </div>

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
                  <option
                    key={e.name}
                    disabled="disabled"
                    default={true}
                    value=""
                  >
                    Limit of 15 temperaments reached
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

          <button
            className="btnSCF"
            type="submit"
            disabled={disableDesactivate}
          >
            Create
          </button>
        </form>

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

        <div className="card-previwe-formC">
          {input.name ? (
            <Card
              id={input.name}
              name={input.name}
              img={input.image}
              maxWeight={input.maxWeightKg}
              temperament={input.temper}
              isPreview={true}
            />
          ) : (
            ``
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCreate;
