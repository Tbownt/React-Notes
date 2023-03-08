const api_key = "U2JcARmEEoohvS73sS9SfTYBIIEitqet";

export const getGifs = async (category) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${category}&limit=10`;
  const peticion = await fetch(url);
  const { data } = await peticion.json();
  const gifs = data.map((img) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));
  return gifs;
};
