import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./slice/contactSlice";

const store = configureStore({
  reducer: {
    [contactSlice.name]: contactSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
