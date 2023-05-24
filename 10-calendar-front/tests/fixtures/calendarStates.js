export const events = [
  {
    id: "1",
    start: new Date("2023-10-06 13:00:00"),
    end: new Date("2023-10-06 15:00:00"),
    title: "Cumpleaños de Andres",
    notes: "Alguna Nota",
  },
  {
    id: "2",
    start: new Date("2023-12-12 13:00:00"),
    end: new Date("2023-12-12 15:00:00"),
    title: "Cumpleaños de Shura",
    notes: "Alguna Nota de Shura",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: true,
  events: [...events],
  activeEvent: { ...events[0] },
};
