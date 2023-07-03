import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appUsersSlice from "./appUsers";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    appUsers: appUsersSlice.reducer,
  },
});

export default store;
