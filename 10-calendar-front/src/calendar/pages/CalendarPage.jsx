import { useState } from "react";
import {
  CalendarEvent,
  CalendarModal,
  Navbar,
  FabAddNew,
  FabDelete,
} from "../";
import { localizer, getMessagesEs } from "../../helpers";
import { useUiStore, useCalendarStore } from "../../hooks";

import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

// import { addHours } from "date-fns";

// const events = [
//   {
//     title: "Cumple del jefe",
//     notes: "Hay q comprar cum",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//       _id: "123",
//       name: "Andres",
//     },
//   },
// ];

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  // eslint-disable-next-line no-unused-vars
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const { events, setActiveEvent } = useCalendarStore();

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };
  const onSelect = (event) => {
    setActiveEvent(event);
  };
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <div>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </div>
  );
};
