import { singInWithGoogle } from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
  startGoogleSignIn,
} from "../../../src/store/auth";
import { checkingAuthentication } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y login", async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn debe de llamar checkingCredentials y logout con un mensaje de error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Ocurrio un error inesperado",
    };
    //se hace un mock simulando una respuesta positiva de la funcion
    await singInWithGoogle.mockResolvedValue(loginData);

    //se dispara la action/trunk
    await startGoogleSignIn()(dispatch);

    //y se espera que esa action contenga las siguientes funciones, una de checkear credenciales y otra enviando un mensaje de error
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });
});
