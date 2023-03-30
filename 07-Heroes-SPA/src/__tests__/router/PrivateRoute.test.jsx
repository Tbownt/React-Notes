import { PrivateRouter } from "../../router/PrivateRouter";
import { AuthContext } from "../../auth";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas en <PrivateRoute/>", () => {
  test("debe de mostrar el children si esta autenticado ", () => {
    Storage.prototype.setItem = jest.fn();
    const contextValue = {
      logged: true,
      user: {
        id: "abc",
        name: "Tbownt",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search?q=batman"]}>
          <PrivateRouter>
            <h1>Ruta Privada</h1>
          </PrivateRouter>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta Privada")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/search?q=batman"
    );
  });
});
