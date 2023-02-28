const { getSaludo } = require("../../src/base-pruebas/02-template-string");

describe("Pruebas en 02-template-string", () => {
  test("Debe devolver un saludo con el nombre que se le pasa por argumento", () => {
    const nombre = "Andres";
    const message = getSaludo(nombre);
    expect(message).toBe(`Hola ${nombre}`);
  });
});
