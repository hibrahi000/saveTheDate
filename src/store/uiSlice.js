import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  musicStarted: false,
  musicMuted:   false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    musicStartedOn(state)    { state.musicStarted = true; },
    toggleMute(state)        { state.musicMuted = !state.musicMuted; },
  },
});

export const { musicStartedOn, toggleMute } = uiSlice.actions;
export default uiSlice.reducer;
