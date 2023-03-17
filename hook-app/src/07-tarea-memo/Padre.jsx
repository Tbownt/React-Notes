import { Hijo } from "./Hijo";
import { useState, useCallback } from "react";

export const Padre = () => {
  const numeros = [2, 4, 6, 8, 10];
  const [valor, setValor] = useState(0);

  const incrementar = useCallback((value) => {
    setValor((oldValue) => oldValue + value);
  }, []);

  return (
    <div>
      <h1>Padre</h1>
      <p> Total: {valor} </p>
      <hr />

      {numeros.map((n) => (
        <Hijo key={n} numero={n} incrementar={incrementar} />
      ))}
      {/* <Hijo /> */}
    </div>
  );
};
