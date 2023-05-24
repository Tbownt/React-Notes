import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";
import { authSlice } from "./auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
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
