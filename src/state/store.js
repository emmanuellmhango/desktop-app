import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import appUsersSlice from "./appUsers";
import categorySlice from "./categorySlice";
import clientSlice from "./clientSlice";
import claimsSlice from "./claimsSlice";
import selectedClaimSlice from "./selectedClaimSlice";
import systemUsersSlice from "./systemUsersSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    appUsers: appUsersSlice.reducer,
    categories: categorySlice.reducer,
    clients: clientSlice.reducer,
    claims: claimsSlice.reducer,
    selectedClaim: selectedClaimSlice.reducer,
    systemusers: systemUsersSlice.reducer,
  },
});

export default store;
