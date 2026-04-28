import { configureStore } from '@reduxjs/toolkit';
import weddingReducer from './weddingSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    wedding: weddingReducer,
    ui: uiReducer,
  },
});
