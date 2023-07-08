import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedClaim: [],
};

const selectedClaimSlice = createSlice({
  name: "selectedClaim",
  initialState,
  reducers: {
    addSelectedClaim: (state, action) => {
      state.selectedClaim = action.payload;
    },
  },
});

export const { addSelectedClaim } = selectedClaimSlice.actions;
export default selectedClaimSlice;
