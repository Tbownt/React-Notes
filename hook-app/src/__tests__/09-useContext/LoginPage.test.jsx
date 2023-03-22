import { fireEvent, render, screen } from "@testing-library/react";
import { LoginPage } from "../../09-useContext/LoginPage";
import { UserContext } from "../../09-useContext/context/UserContext";

describe("Pruebas en <LoginPage/>", () => {
  const user = {
    email: "andresjose65@hotmail.com",
    id: 123,
    name: "Andres Salom",
  };

  test("debe de mostrar el componente sin el usuario ", () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const spanElement = screen.getByLabelText("pre2");
    expect(spanElement.innerHTML).toBe("null");
  });

  test("debe de llamar el setUser cuando se hace click en el boton ", () => {
    const setUserMock = jest.fn();

    render(
      <UserContext.Provider value={{ user: user, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const buttonElement = screen.getByRole("button", {
      name: "Establecer usuario",
    });

    fireEvent.click(buttonElement);

    const spanElement = screen.getByLabelText("pre2");
    expect(setUserMock).toHaveBeenCalledWith(user);
    expect(spanElement.innerHTML).toContain(user.id.toString());
    expect(spanElement.innerHTML).toContain(user.email.toString());
    expect(spanElement.innerHTML).toContain(user.name.toString());
  });
});
