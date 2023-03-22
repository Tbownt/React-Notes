import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useForm } from "../../hooks/useForm";

describe("Pruebas en useForm", () => {
  const initialForm = {
    name: "Andres",
    email: "andresjose65@hotmail.com",
  };

  test("debe de regresar los valores por defecto ", () => {
    const { result } = renderHook(() => useForm(initialForm));

    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function),
    });
  });

  test("debe de cambiar el nombre del formulario", () => {
    const { result } = renderHook(() => useForm(initialForm));
    const { onInputChange } = result.current;

    const newValue = "Juan";
    act(() => {
      onInputChange({ target: { name: "name", value: newValue } });
    });

    expect(result.current.name).toBe(newValue);
    expect(result.current.formState.name).toBe(newValue);
  });

  test("debe de cambiar el reset del formulario ", () => {
    const newValue = "Juan";
    const { result } = renderHook(() => useForm(initialForm));
    const { onResetForm, onInputChange } = result.current;

    act(() => {
      onInputChange({ target: { name: "name", value: newValue } });
      onResetForm();
    });

    expect(result.current.name).toBe("Andres");
    expect(result.current.formState).toEqual(initialForm);
  });
});
