import { screen, render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth";
import { Navbar } from "../../ui";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <Navbar/>", () => {
  const contextValue = {
    logged: true,
    user: {
      name: "Tbownt",
      id: 123,
    },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());
  test("debe de mostrar el nombre del usuario que esta logueado", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const spanElement = screen.getByLabelText("span");
    expect(spanElement.innerHTML).toContain(contextValue.user.name);
  });

  test("debe de llamar el logout y navigate cuando se hace click en el boton", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const btnElement = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(btnElement);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
