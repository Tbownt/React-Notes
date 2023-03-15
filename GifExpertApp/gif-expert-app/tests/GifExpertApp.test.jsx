import { getByText, render, screen } from "@testing-library/react";
import GifExpertApp from "../src/GifExpertApp";

describe("Pruebas en GifExpertApp", () => {
  test("Debe de matchear el snapshot ", () => {
    const { container } = render(<GifExpertApp />);
    expect(container).toMatchSnapshot();
  });

  test("el titulo debe matchear con el ", () => {
    render(<GifExpertApp />);
    const title = screen.getByRole("heading", { level: 1 }).innerHTML;
    expect(title).toBe("Gif Expert App");
  });

  test("la aplicacion debe contener un form", () => {
    render(<GifExpertApp />);
    const form = screen.getByRole("form");
    expect(form).toBeTruthy();
  });
});
