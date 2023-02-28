const {
  getUser,
  getUsuarioActivo,
} = require("../../src/base-pruebas/05-funciones");

describe("Pruebas en 05-funciones", () => {
  test("getUser debe retornar un objecto", () => {
    const testUser = {
      uid: "ABC123",
      username: "El_Papi1502",
    };

    const user = getUser();
    expect(testUser).toEqual(user);
  });

  test("getUsuarioActivo debe retornar un objeto", () => {
    const name = "Andres";
    const verify = getUsuarioActivo(name);

    expect(verify).toEqual({
      uid: "ABC567",
      username: name,
    });
  });
});
