/* eslint-disable no-undef */
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";

jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

jest.mock("../../src/hooks/useAuthStore", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock;

jest.mock("react-modal", () => ({
  ...jest.requireActual("react-modal"),
  setAppElement: jest.fn(),
}));

describe("AppRouter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe mostrar la pantalla de carga y llamar a checkAuthToken", async () => {
    // Mock useAuthStore
    const mockCheckAuthToken = jest.fn();
    useAuthStore.mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "checking",
    });

    // Render component
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    // Esperar a que checkAuthToken se llame y se resuelva
    await waitFor(() => {
      expect(mockCheckAuthToken).toHaveBeenCalled();
    });

    // Verificar que se muestra la pantalla de carga
    const loadingText = screen.getByText("Cargando...");
    expect(loadingText).toBeTruthy();
  });

  test("debe de mostrar el login en caso de no estar autenticado", () => {
    const mockCheckAuthToken = jest.fn();
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("debe de mostrar el calendario si estamos autenticados", () => {
    const mockCheckAuthToken = jest.fn();
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
