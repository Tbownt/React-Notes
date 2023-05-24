export const getCurrentDate = () => {
  const date = new Date();

  // Obtiene las partes de la fecha
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "pm" : "am";
  const month = date.getMonth() + 1; // Los meses se indexan desde 0, por lo que se agrega 1
  const day = date.getDate();
  const year = date.getFullYear();

  // Formatea la hora en formato de 12 horas
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Crea la cadena de fecha formateada
  const currentDate = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm} - ${month}/${day}/${year}`;

  return currentDate;
};
