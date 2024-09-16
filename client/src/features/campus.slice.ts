import { EventCampus } from "@/constants/event.constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CampusState {
  campus: EventCampus;
}

const initialState: CampusState = {
  campus: EventCampus.Tampa,
};

const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {
    setCampus: (state, action: PayloadAction<EventCampus>) => {
      state.campus = action.payload;
    },
  },
});

export const { setCampus } = campusSlice.actions;
export default campusSlice.reducer;
