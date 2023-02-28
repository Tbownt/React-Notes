const { render, screen, fireEvent } = require("@testing-library/react");
const { default: CounterApp } = require("../src/CounterApp");

describe("Pruebas en CounterApp", () => {
  const valor = 100;

  test("debe hacer de hacer match con el snapshot", () => {
    const { container } = render(<CounterApp value={valor} />);
    expect(container).toMatchSnapshot();
  });

  test("debe de mostrar el valor inicial de 100", () => {
    render(<CounterApp value={valor} />);
    expect(screen.getByText(valor)).toBeTruthy();
  });

  test("debe de incrementar con el boton +1", () => {
    render(<CounterApp value={valor} />);
    fireEvent.click(screen.getByText("+1"));
    expect(screen.getByText("101")).toBeTruthy();
  });

  test("debe de decrementar con el boton -1", () => {
    render(<CounterApp value={valor} />);
    fireEvent.click(screen.getByText("-1"));
    expect(screen.getByText("99")).toBeTruthy();
  });

  test("debe de resetear el valor del state con el boton de reset", () => {
    render(<CounterApp value={valor} />);
    fireEvent.click(screen.getByText("+1"));
    fireEvent.click(screen.getByText("+1"));
    fireEvent.click(screen.getByText("+1"));
    // fireEvent.click(screen.getByText("Reset"));
    fireEvent.click(screen.getByRole("button", { name: "btn-reset" }));
    expect(screen.getByText(valor)).toBeTruthy();
    // expect(screen.getByText(valor)).toBeTruthy();
  });
});
