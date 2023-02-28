const {
  getHeroeById,
  getHeroesByOwner,
} = require("../../src/base-pruebas/08-imp-exp");

describe("Pruebas en 08-imp-exp", () => {
  test("getHeroeById debe retonar un heroe por ID", () => {
    const id = 1;
    const hero = getHeroeById(id);
    expect(hero).toEqual({ id: 1, name: "Batman", owner: "DC" });
    //se pueden tener tantos expects como se necesite
  });
  test("getHeroeById debe retonar undefined si no existe ", () => {
    const id = 100;
    const hero = getHeroeById(id);
    expect(hero).toBeFalsy();
  });

  /*
  Tarea: 
  Debe retonar un arreglo con los Heroes de DC
  length === 3
  toEqual al arreglo filtrado

  Debe retonar un arreglo con los heroes de Marvel
  length === 2
  */
  test("getHeroesByOwner Debe retonar los 3 heroes de DC", () => {
    const DC = getHeroesByOwner("DC");
    expect(DC).toEqual([
      { id: 1, name: "Batman", owner: "DC" },
      { id: 3, name: "Superman", owner: "DC" },
      { id: 4, name: "Flash", owner: "DC" },
    ]);
    expect(DC).toHaveLength(3);
  });
  test("getHeroesByOwner Debe retonar los 2 heroes de Marvel", () => {
    const Marvel = getHeroesByOwner("Marvel");
    expect(Marvel).toEqual([
      { id: 2, name: "Spiderman", owner: "Marvel" },
      { id: 5, name: "Wolverine", owner: "Marvel" },
    ]);
    expect(Marvel).toHaveLength(2);
  });
});
