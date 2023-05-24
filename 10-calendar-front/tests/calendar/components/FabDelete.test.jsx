/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";
import { Provider } from "react-redux";
import { store } from "../../../src/store";
import Swal from "sweetalert2";

jest.mock("../../../src/hooks/useCalendarStore");

jest.mock("sweetalert2", () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe("Pruebas en <FabDelete/>", () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );

    const btn = screen.getByLabelText("btn-delete");
    // console.log(btn.classList.toString());

    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-danger");
    expect(btn.style.display).toBe("none");
  });

  test("debe de mostrar el boton cuando hay un evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );

    const btn = screen.getByLabelText("btn-delete");
    // console.log(btn.classList.toString());

    expect(btn.style.display).toBe("");
  });

  test("debe de llamar startDeletingEvent si hay un evento activo", async () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );

    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "¿Estas seguro?",
      text: "No podras rehacer esta accion una vez tomada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro",
    });

    // Esperar a que Swal.fire se resuelva
    await Swal.fire.mockResolvedValue({ isConfirmed: true });

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
