import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from '@/app/events/eventsSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      events: eventsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
