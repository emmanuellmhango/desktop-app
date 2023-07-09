import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claims: [],
};
const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    addClaim: (state, action) => {
      state.claims = action.payload;
    },
    deleteClaim: (state, action) => {
      state.claims = state.categories.filter(
        (claim) => claim.id !== action.payload
      );
    },
  },
});

export const { addClaim, deleteClaim } = claimsSlice.actions;
export default claimsSlice;
