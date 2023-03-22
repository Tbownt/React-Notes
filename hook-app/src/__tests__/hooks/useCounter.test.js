import { act, renderHook } from "@testing-library/react";
import { useCounter } from "../../hooks/useCounter";

describe("Pruebas en el useCounter", () => {
  test("debe de retonar los valores por defecto", () => {
    const { result } = renderHook(() => useCounter());
    const { counter, decrement, increment, reset } = result.current;

    expect(counter).toBe(10);
    expect(increment).toEqual(expect.any(Function));
    expect(decrement).toEqual(expect.any(Function));
    expect(reset).toEqual(expect.any(Function));
  });

  test("debe de generar el counter con el valor de 100", () => {
    const { result } = renderHook(() => useCounter(100));
    const { counter } = result.current;
    expect(counter).toBe(100);
  });

  test("debe de incrementar el contador", () => {
    const { result } = renderHook(() => useCounter());
    const { increment } = result.current;

    act(() => {
      increment();
      increment(2);
    });

    expect(result.current.counter).toBe(13);
  });

  test("debe de decrementar el contador", () => {
    const { result } = renderHook(() => useCounter());
    const { decrement } = result.current;

    act(() => {
      decrement();
      decrement(2);
    });

    expect(result.current.counter).toBe(8);
  });

  test("debe de resetear el contador", () => {
    const { result } = renderHook(() => useCounter(100));
    const { reset, increment } = result.current;

    act(() => {
      increment(2);
      increment(3);
      increment(4);
      increment(5);
      reset();
    });

    expect(result.current.counter).toBe(100);
  });
});
