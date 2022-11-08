import axios from "axios";

const url = process.env.REACT_APP_BACK_URL;

export function getDogs() {
  return async function (dispach) {
    const response = await axios.get(`${url}/dogs`);
    dispach({
      type: "GET_DOGS",
      payload: response.data,
    });
  };
}

export function getDogsName(name) {
  return async function (dispach) {
    try {
      const response = await axios.get(`${url}/dogs?name=${name}`);
      return dispach({
        type: "GET_DOGS_BY_NAME",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function getTempers() {
  return async function (dispach) {
    const response = await axios.get(`${url}/temperaments`);
    dispach({
      type: "GET_TEMPERS",
      payload: response.data,
    });
  };
}

export function getDogsId(id) {
  return async function (dispach) {
    const response = await axios.get(`${url}/dogs/${id}`);
    dispach({
      type: "GET_DOGS_ID",
      payload: response.data,
    });
  };
}

export function clearError() {
  return {
    type: "CLEAR_ERROR",
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}
export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}
export function filterTemper(payload) {
  return {
    type: "FILTER_TEMPER",
    payload,
  };
}

export function filterBreed(payload) {
  return {
    type: "FILTER_BREED",
    payload,
  };
}

export function createDogs(payload) {
  return async function (dispach) {
    try {
      const response = await axios.post(`${url}/dogs`, payload);
      return dispach({
        type: "CREATE_DOGS",
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
}

export function clearDetails() {
  return {
    type: "CLEAR_DETAILS",
  };
}
