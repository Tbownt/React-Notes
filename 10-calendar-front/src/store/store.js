import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { calendarSlice } from "./calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  //este middleware es para desactivar el serializableCheck que ocasiona conflictos en la aplicacion
  //el error proviene del start/end de los reducers pero dado a que es una biblioteca de terceros
  //es mas complicado de arreglar asi que en su caso, desactivo el warning que salta
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
