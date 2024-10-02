import { combineReducers, createStore } from "redux";
import planReducer from "../features/planning/planSlice";

const rootReducer = combineReducers({
  plan: planReducer,
});
const rootStore = createStore(rootReducer);

export default rootStore;
