/* eslint-disable no-undef */
import calendarApi from "../../../src/api/calendarApi";

describe("Pruebas en el CalendarApi", () => {
  test("debe de tener la configuracion por defecto", () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("debe de tener el x-token en el header de todas las peticiones ", async () => {
    const token = "ABC-123-XYZ";

    localStorage.setItem("token", token);

    const resp = await calendarApi.post("/auth", {
      email: "test@gmail.com",
      password: "123456",
    });

    expect(resp.config.headers["x-token"]).toBe(token);
  });
});
