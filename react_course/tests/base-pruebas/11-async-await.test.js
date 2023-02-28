const { getImagen } = require("../../src/base-pruebas/11-async-await");

describe("Pruebas en 11-async-await", () => {
  test("getImagen debe retornar un error si no tenemos APIKEY", async () => {
    const resp = await getImagen();

    expect(resp).toBe("No se encontro la imagen");
  });
});
