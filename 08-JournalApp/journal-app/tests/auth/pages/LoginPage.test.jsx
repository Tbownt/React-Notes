import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";

import { notAuthenticatedState } from "../../fixtures/authFixtures";

//es importante comenzar la funcion con un "mock" porque en el caso contrario no funcionara ya que Jest
//espera una funcion del tipo mock

//reminder de mocks: Los mocks se definen como herramientas de implementación de una interfaz que devuelve el valor solicitado.

const mockStartGoogleSignIn = jest.fn();

const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

//de esta manera se puede utilizar muchas otras funciones/librerias/funciones de terceros/etc
//el useDispatch es una funcion que devuelve otra funcion y la invoca
//por eso se ve de esta manera

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Pruebas en el <LoginPage/>", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByText("Login").length).toBeGreaterThan(1);
  });

  test("el boton de Google debe llamar al startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText("google-btn");

    fireEvent.click(googleBtn);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("submit debe de llamar la funcion startLoginWithEmailPassword", () => {
    const email = "tbownt@google.es";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const formField = screen.getByLabelText("form");
    fireEvent.submit(formField);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
