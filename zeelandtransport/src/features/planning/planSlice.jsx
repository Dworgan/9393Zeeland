import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromStationQuery: '',
  fromStation: '',
  toStationQuery: '',
  toStation: '',
  time: new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
};

const planSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setFromQuery: (state, action) => {
      console.log(state.fromStationQuery + '   ' + action.payload);
      state.fromStationQuery = action.payload;
      console.log(state.fromStationQuery + '   ' + action.payload);
    },
    setFromStation(state, action) {
      state.fromStation = action.payload;
    },
    setToQuery(state, action) {
      state.toStationQuery = action.payload;
    },
    setToStation(state, action) {
      state.toStation = action.payload;
    },
  },
});
console.log(planSlice);

export const { setFromQuery, setFromStation, setToQuery, setToStation } =
  planSlice.actions;

export default planSlice.reducer;
/*
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
*/
