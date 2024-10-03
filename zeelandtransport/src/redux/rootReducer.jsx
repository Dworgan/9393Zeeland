import { configureStore } from '@reduxjs/toolkit';
import planReducer from '../features/planning/planSlice';

const mainStore = configureStore({
  reducer: {
    plan: planReducer,
  },
});
//mainStore.dispatch(planReducer.setFromQuery('test'));

export default mainStore;
