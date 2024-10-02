import { createSlice } from '@reduxjs/toolkit';

/*
  planning state:
  empty
  planFrom
  planTo
  planFilter
  planDone
*/

const station = {
  _id: -1,
  name: '',
};

const initialState = {
  listOfStation: [],
  planningState: '',
  fromStationQuery: '',
  fromStation: station,
  fromStationsList: [],
  toStationQuery: '',
  toStation: station,
  toStationsList: [],

  time: new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
};

const planSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setListOfStations(state, action) {
      state.listOfStation = action.payload;
    },
    setFromQuery: (state, action) => {
      state.fromStationQuery = action.payload;
      state.planningState = 'planFrom';
      let result = [];
      result = state.listOfStation.filter(
        (station) =>
          station.name.includes(state.fromStationQuery) && [
            ...result,
            station.name,
          ]
      );
      state.fromStationsList = result;
    },
    setFromStation(state, action) {
      state.fromStation = action.payload;
      state.fromStationQuery = state.fromStation.name;
      state.planningState = '';
      state.toStation !== null && (state.planningState = 'planFilter');
    },
    setToQuery(state, action) {
      state.toStationQuery = action.payload;
      state.planningState = 'planTo';
      let result = [];
      result = state.listOfStation.filter(
        (station) =>
          station.name.includes(state.toStationQuery) && [
            ...result,
            station.name,
          ]
      );
      state.toStationsList = result;
    },
    setToStation(state, action) {
      state.toStation = action.payload;
      state.toStationQuery = state.toStation.name;
      state.planningState = '';

      state.fromStation !== null && (state.planningState = 'planFilter');
    },
    setPlanningState(state, action) {
      state.planningState = action.payload;
    },
  },
});

export const {
  setListOfStations,
  setFromQuery,
  setFromStation,
  setToQuery,
  setToStation,
} = planSlice.actions;

export default planSlice.reducer;
