//Ejercicio practico de Testing

const { usContext } = require("../../src/base-pruebas/06-deses-obj");

describe("Prueba 06-deses-obj", () => {
  test("useContext deberia retonar un objeto", () => {
    const objTest = usContext(123, 22);
    console.log(objTest);
    expect(objTest).toEqual({
      nombreClave: 123,
      anios: 22,
      latlng: {
        lat: 14.1232,
        lng: -12.3232,
      },
    });
  });
});
