import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en <SearchPage/>", () => {
  beforeEach(() => jest.clearAllMocks());
  test("debe de mostrarse correctamente con valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test("debe de mostrar a Batman y el input con el valor del queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    expect(input.getAttribute("value")).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toContain("/heroes/dc-batman.jpg");

    const div = screen.getByLabelText("success");
    expect(div.style.display).toBe("none");
  });

  test("debe de mostrar un error si no se encuentra el hero", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=tbownt"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("tbownt");

    const div = screen.getByLabelText("error");
    expect(div.style.display).not.toBe("none");
  });

  test("debe de llamar el navigate a la pantalla nueva", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    const form = screen.getByLabelText("form");
    fireEvent.change(input, {
      target: { name: "searchText", value: "superman" },
    });

    fireEvent.submit(form);
    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=superman`);
  });
});
