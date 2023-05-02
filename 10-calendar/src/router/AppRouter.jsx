import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
  const authStatus = "authenticated"; //"authenticated"
  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}
      {/* Esta es una ruta a prueba de fallos */}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
