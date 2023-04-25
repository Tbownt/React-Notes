import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dpotjz1g0",
  api_key: "499741425262615",
  api_secret: "A8lENTjqhaCd6TVfK_kWTezniEQ",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("debe de subir el archivo correctamente a cloudinary", async () => {
    //este test en un futuro puede fallar ya que esta apuntando a una imagen en la web
    //que puede ser removida en cualquier momento, basta con simplemente cambiar a otra imagen
    const imageUrl =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQ0Bmq7SP_SIpUP2stAkC6fmin1h73c2zfw&usqp=CAU";

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");

    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
    // console.log(url);
    const segments = url.split("/");
    //buscamos el id en el url utilizando split, separando todos los elementos por el /
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    //obtenemos en ultimo elemento de nuestro arreglo y el .jpg lo reemplazamos por un string vacio
    //de esta manera obtenemos el id de la imagen
    await cloudinary.api.delete_resources(["journal/" + imageId], {
      resource_type: "image",
    });
  });

  test("debe de retonar null cuando no recibe un argumento", async () => {
    const file = new File([], "foto.jpg");

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
