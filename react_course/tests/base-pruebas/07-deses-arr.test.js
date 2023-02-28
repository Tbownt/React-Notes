const { retornaArreglo } = require("../../src/base-pruebas/07-deses-arr");

describe("Pruebas en 07-deses-arr", () => {
  test("debe retonar un string y un numero", () => {
    const testArr = retornaArreglo();
    const [string, number] = testArr;
    expect(string).toBe("ABC");
    expect(number).toBe(123);
    expect(typeof string).toBe("string");
    expect(typeof number).toBe("number");
    expect(string).toEqual(expect.any(String));
  });
});
