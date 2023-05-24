/* eslint-disable no-undef */
import {
  calendarSlice,
  onAddNewEvent,
  onUpdateEvent,
  onSetActiveEvent,
  onLoadEvents,
  onDeleteEvent,
  onClearCalendar,
} from "../../../../src/store/calendar/calendarSlice";

import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../../fixtures/calendarStates";

describe("Pruebas en calendarSlice", () => {
  test("debe de regresar el estado por defecto ", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActiveEvent debe de activar el evento ", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );

    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvents debe de agregar un nuevo evento", () => {
    const newEvent = {
      id: "3",
      start: new Date("2023-4-4 13:00:00"),
      end: new Date("2023-4-4 15:00:00"),
      title: "Cumpleaños de Shura!!",
      notes: "Alguna Nota de Shura!!",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent debe de agregar un nuevo evento", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2023-10-21 13:00:00"),
      end: new Date("2023-10-21 15:00:00"),
      title: "test update",
      notes: "test updated",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent debe de borrar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });

  test("onLoadEvents debe de establecer los eventos ", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.events.length).toBeGreaterThan(1);
    expect(state.events).toEqual(events);
    expect(state.isLoadingEvents).toBeFalsy();
  });

  test("onClearCalendar debe de limpiar el estado", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onClearCalendar()
    );

    expect(state).toEqual(initialState);
  });
});
