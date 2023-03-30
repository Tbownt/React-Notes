import { types } from "../../../../auth/types/types";

describe("pruebas en types.js", () => {
  test("debe de regresar estos types", () => {
    expect(types).toEqual({
      login: "[Auth] Login",
      logout: "[Auth] Logout",
    });
  });
});
