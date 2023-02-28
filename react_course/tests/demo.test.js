/*
En esta seccion estoy viendo los test unitarios y de integracion
Se implementan a la hora de crear un proyecto y evitar posibles bugs
al implementar testing en una aplicacion no significa que este 100% fuera de bugs
Solo que nos aseguramos que a la hora de la integracion todo este andando lo mejor posible
*/
describe("Pruebas en <DemoComponent />", () => {
  test("Esta prueba no debe de fallar", () => {
    //1. Inicializacion
    const message1 = "Hola mundo";
    //2. Estimulo
    const message2 = message1.trim();
    //3. Observar el comportamiento... esperado
    // expect(message1).toBe(message2);
    expect(message1).toBe(message2);
  });
});
