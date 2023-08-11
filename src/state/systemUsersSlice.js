import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  systemusers: [],
};

const systemUsersSlice = createSlice({
  name: "systemusers",
  initialState,
  reducers: {
    addSystemUsers: (state, action) => {
      state.systemusers = action.payload;
    },
    deleteSystemUser: (state, action) => {
      state.systemusers = state.systemusers.filter(
        (user) => user.id !== action.payload
      );
    },
  },
});

export const { addSystemUsers, deleteSystemUser } = systemUsersSlice.actions;
export default systemUsersSlice;
