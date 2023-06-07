const initialState = {
  allDogs: [],
  dogs: [],
  tempers: [],
  dogsDetails: {},
  error: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
      };

    case "GET_DOGS_BY_NAME":
      if (action.payload === "Non-existent") {
        return {
          ...state,
          error: action.payload,
        };
      } else {
        return {
          ...state,
          dogs: action.payload,
        };
      }
    case "GET_DOGS_ID":
      return {
        ...state,
        dogsDetails: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: [],
      };
    case "ORDER_BY_NAME":
      const orderBN =
        action.payload === "asc"
          ? [...state.dogs].sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }

              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : [...state.dogs].sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }

              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: orderBN,
      };
    case "ORDER_BY_WEIGHT":
      const orderBW =
        action.payload === "desc"
          ? [...state.dogs].sort(function (a, b) {
              return b.maxWeightKg - a.maxWeightKg;
            })
          : [...state.dogs].sort(function (a, b) {
              return a.maxWeightKg - b.maxWeightKg;
            });
      return {
        ...state,
        dogs: orderBW,
      };
    case "FILTER_TEMPER":
      const filteredT =
        action.payload === "all"
          ? state.allDogs
          : state.allDogs.filter(
              (t) => t.temperament && t.temperament.includes(action.payload)
            );
      return {
        ...state,
        dogs: filteredT,
      };

    case "FILTER_BREED":
      if (action.payload === "db") {
        return {
          ...state,
          dogs: state.allDogs.filter((e) => e.id.length >= 36),
        };
      } else {
        return {
          ...state,
          dogs: state.allDogs.filter((e) => typeof e.id === "number"),
        };
      }

    case "GET_TEMPERS":
      return {
        ...state,
        tempers: action.payload,
      };
    case "CREATE_DOGS":
      return {
        ...state,
      };
    case "CLEAR_DETAILS":
      return {
        ...state,
        dogsDetails: {},
      };
    case "RESET_DOGS":
      return {
        ...state,
        dogs: state.allDogs,
      };
    default:
      return state;
  }
}
