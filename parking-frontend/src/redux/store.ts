import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './placeSlice';

const store = configureStore({
  reducer: {
    places: placeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;