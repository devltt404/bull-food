import { EventCampus } from "@/constants/event.constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CampusState } from "./types";

const initialState: CampusState = {
  campus: (localStorage.getItem("campus") as EventCampus) ?? EventCampus.Tampa,
};

const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    setCampus: (state, action: PayloadAction<EventCampus>) => {
      state.campus = action.payload;
      localStorage.setItem("campus", action.payload);
    },
  },
});

export const { setCampus } = campusSlice.actions;
export default campusSlice.reducer;
