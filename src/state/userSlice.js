import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },
    logoutUser: (state, action) => {
      state.user = [];
    },
  },
});

export const { addUser, deleteUser, logoutUser } = userSlice.actions;
export default userSlice;
