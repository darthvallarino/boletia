import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const eventsAdapter = createEntityAdapter();

const slice = createSlice({
  name: "events",
  initialState: eventsAdapter.getInitialState(),
  reducers: {
    add: eventsAdapter.upsertOne,
    remove: eventsAdapter.removeOne,
    removeAll: eventsAdapter.removeAll,
    setAll: eventsAdapter.setAll,
    upsertMany: eventsAdapter.upsertMany,
    removeMany: eventsAdapter.removeMany,
  },
});

export const {
  add,
  remove,
  removeAll,
  setAll,
  upsertMany,
  removeMany,
} = slice.actions;

export const simpleSelectors = eventsAdapter.getSelectors();

export default slice.reducer;
