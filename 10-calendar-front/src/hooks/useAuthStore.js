import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onClearCalendar,
  onLogin,
  onLogout,
} from "../store";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);

      // Util para realizar calculos con respecto a la hora de expiracion del token.
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || "Error interno."));
      // Con timeout pequeño para triggerear una ejecucion del useEffect en el LoginPage.jsx
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token)
      return dispatch(
        onLogout(
          "Tu sesion ha expirado, vuelve a la pagina de inicio para reingresar"
        )
      );

    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      return dispatch(
        onLogout(
          "Lo sentimos, tu sesion ha expirado, vuelve a la pagina de inicio para reingresar"
        )
      );
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onClearCalendar());
    dispatch(onLogout());
  };

  return {
    //Propiedades
    status,
    user,
    errorMessage,
    //Metodos,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
