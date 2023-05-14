import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/usersSlice";
import filesSlice from "../features/filesSlice";

export const store = configureStore({
  reducer: {usersSlice, filesSlice },
});
