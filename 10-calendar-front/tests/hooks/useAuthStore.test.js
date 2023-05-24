/* eslint-disable no-undef */
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";
const { renderHook, act, waitFor } = require("@testing-library/react");
import { initialState, notAuthenticatedState } from "../fixtures/authState";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("debe de regresar los valores por defecto ", () => {
    const mockStore = getMockStore({
      status: "checking",
      user: {},
      errorMessage: undefined,
    });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: "checking",
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startLogin debe de realizar el login correctamente", async () => {
    //pudiera ser que una prueba por ahi tenga por ahi el token asi
    //que aqui me aseguro de que no haya nada en el localStorage

    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "test", uid: "6463dcf2a46af8d876ad798f" },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin debe de fallar la autenticacion con credenciales incorrectas", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "algo@gmail.com",
        password: "patito",
      });
    });

    const { errorMessage, status, user } = result.current;

    expect(localStorage.getItem("token")).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Credenciales incorrectas",
      status: "not-authenticated",
      user: {},
    });

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test("startRegister debe de crear un usuario", async () => {
    const newUser = {
      email: "algo@gmail.com",
      password: "patito",
      name: "testUser",
    };

    // Configurar el estado inicial del store simulado
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });

    // Renderizar el hook de prueba
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    // Espiar la función calendarApi.post y devolver una respuesta simulada
    const spy = jest.spyOn(calendarApi, "post").mockResolvedValueOnce({
      data: {
        ok: true,
        uid: "ABC-123-XYZ",
        name: "testUser",
        token: "Algun-Token",
      },
    });

    // Llamar a la función startRegister y esperar a que se resuelva
    await act(async () => {
      await result.current.startRegister(newUser);
    });

    // Obtener los valores actuales del resultado del hook
    const { errorMessage, user, status } = result.current;

    // Verificar los valores esperados después de la ejecución de startRegister
    expect({ errorMessage, user, status }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "testUser", uid: "ABC-123-XYZ" },
    });

    // Verificar que se haya guardado el token en localStorage
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));

    // Restaurar la implementación original de calendarApi.post
    spy.mockRestore();
  });

  test("startRegister debe de fallar la creacion", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });

    // Renderizar el hook de prueba
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    // Obtener los valores actuales del resultado del hook
    const { errorMessage, user, status } = result.current;

    expect({ errorMessage, user, status }).toEqual({
      errorMessage: "El usuario ya existe",
      user: {},
      status: "not-authenticated",
    });
  });

  test("checkAuthToken debe de fallar si no hay token", async () => {
    const mockStore = getMockStore({
      ...initialState,
    });

    // Renderizar el hook de prueba
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage:
        "Tu sesion ha expirado, vuelve a la pagina de inicio para reingresar",
      status: "not-authenticated",
      user: {},
    });
    expect(localStorage.getItem("token")).toBe(null);
  });

  test("checkAuthToken debe de autenticar si hay un token", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);

    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({
      ...initialState,
    });

    // Renderizar el hook de prueba
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "test", uid: "6463dcf2a46af8d876ad798f" },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
  });
});
