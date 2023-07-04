import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appUsersSlice from "./appUsers";
import categorySlice from "./categorySlice";
import clientSlice from "./clientSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    appUsers: appUsersSlice.reducer,
    categories: categorySlice.reducer,
    clients: clientSlice.reducer,
  },
});

export default store;
