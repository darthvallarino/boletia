import { useSelector, useDispatch } from "react-redux";
import {
  add,
  remove,
  removeAll,
  setAll,
  upsertMany,
  removeMany,
} from "./eventsSlice";

export default function useEvents() {
  const events = useSelector((state) => Object.values(state.events.entities || {}));
  const dispatch = useDispatch();

  const addEvent = (event) => dispatch(add(event));
  const removeEvent = (id) => dispatch(remove(id));
  const removeAllEvents = () => dispatch(removeAll());
  const setAllEvents = (events) => dispatch(setAll(events));
  const upsertManyEvents = (events) => dispatch(upsertMany(events));
  const removeManyEvents = (events) => dispatch(removeMany(events));

  return {
    events,
    addEvent,
    removeEvent,
    removeAllEvents,
    setAllEvents,
    upsertManyEvents,
    removeManyEvents,
  };
}
