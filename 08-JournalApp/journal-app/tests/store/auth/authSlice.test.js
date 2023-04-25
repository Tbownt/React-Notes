import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import { demoUser, initialState } from "../../fixtures/authFixtures";

describe("Pruebas en el authSlice", () => {
  test('debe de regresar el estado inicial y llamarse "auth"', () => {
    const state = authSlice.reducer(initialState, {});

    expect(authSlice.name).toBe("auth");
    expect(state).toEqual(initialState);
  });

  test("debe de realizar la autenticacion", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("debe de realizar el logout", () => {
    const state = authSlice.reducer(initialState, logout());

    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test("debe de realizar el logout y mostrar un mensaje de errror", () => {
    const errorMessage = "Credenciales incorrectas";

    //al logout se le envia por payload el mensaje de error para que se imprima en el estado

    const state = authSlice.reducer(initialState, logout({ errorMessage }));
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: "Credenciales incorrectas",
    });
  });

  test("debe de cambiar el estado a checking", () => {
    const state = authSlice.reducer(initialState, checkingCredentials());
    expect(state.status).toBe("checking");
  });
});
