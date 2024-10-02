const initialPlanState = {
  fromStationQuery: "",
  fromStation: "",
  toStationQuery: "",
  toStation: "",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

export default function planReducer(state = initialPlanState, action) {
  switch (action.type) {
    case "plan/setFromQuery":
      return { ...state, fromStationQuery: action.payload };
    case "plan/setFromStation":
      return { ...state, fromStation: action.payload };
    case "plan/setToQuery":
      return { ...state, toStation: action.payload };
    case "plan/setToStation":
      return { ...state, toStation: action.payload };
    default:
      return state;
  }
}

export function setFromQuery(query) {
  return { type: "plan/setFromQuery", payload: query };
}
export function setFromStation(station) {
  return { type: "plan/setFromStation", payload: station };
}

export function setToQuery(query) {
  return { type: "plan/setToQuery", payload: query };
}
