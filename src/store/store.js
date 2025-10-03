import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "./placeSlice";

const store = configureStore({
  reducer: {
    places: placeReducer,
  },
});

export default store;
