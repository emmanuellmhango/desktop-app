import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appUsers: [],
};

const appUsersSlice = createSlice({
  name: "appUsers",
  initialState,
  reducers: {
    addAppUsers: (state, action) => {
      state.appUsers = action.payload;
    },
  },
});

export const { addAppUsers } = appUsersSlice.actions;
export default appUsersSlice;
