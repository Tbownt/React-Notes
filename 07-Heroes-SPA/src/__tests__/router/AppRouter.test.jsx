import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../router/AppRouter";
import { AuthContext } from "../../auth";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <AppRouter/>", () => {
  test("debe de mostrar el login si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Login")).toHaveLength(2);
  });

  test("debe de mostrar MarvelPage si esta autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Tbownt",
        id: 123,
      },
    };

    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.innerHTML).toBe("MarvelPage");
  });
});
