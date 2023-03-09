import {createSlice, PayloadAction} from '@reduxjs/toolkit';
//TODO: Update any type
export interface NavState {
  origin: any;
  destination: any;
  travelTimeInfo: any;
}

const initialState: NavState = {
  origin: null,
  destination: null,
  travelTimeInfo: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInfo: (state, action: PayloadAction<number>) => {
      state.travelTimeInfo = action.payload;
    },
  },
});

export const {setOrigin, setDestination, setTravelTimeInfo} = navSlice.actions;

// Selectors
export const selectOrigin = (state: any) => state.nav.origin;
export const selectDestination = (state: any) => state.nav.destination;
export const selectTravelTimeInfo = (state: any) => state.nav.travelTimeInfo;

export default navSlice.reducer;
