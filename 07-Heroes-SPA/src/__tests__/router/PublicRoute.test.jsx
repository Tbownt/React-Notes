import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../auth";
import { PublicRouter } from "../../router/PublicRouter";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Pruebas en <PublicRouter/>", () => {
  test("debe de mostrar el children si no esta autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRouter>
          <h1>Ruta Publica</h1>
        </PublicRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta Publica")).toBeTruthy();
  });

  test("debe de el navegar si esta autenticado", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Tbownt",
        id: "ABC",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRouter>
                  <h1>Ruta Publica</h1>
                </PublicRouter>
              }
            />
            <Route path="marvel" element={<h1>pagina marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("pagina marvel")).toBeTruthy();
  });
});
