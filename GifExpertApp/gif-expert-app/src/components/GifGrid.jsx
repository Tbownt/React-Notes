import { useFetchGifs } from "../hooks/useFetchGifs";
import { GifItem } from "./GifItem";

export const GifGrid = ({ category, onDeleteCategory }) => {
  const { images, isLoading } = useFetchGifs(category);

  return (
    <>
      <div className="gridTitle">
        <h3>{category}</h3>
        <button onClick={onDeleteCategory} className="btn">
          X
        </button>
      </div>
      {isLoading && <h2>Cargando...</h2>}
      <div className="card-grid">
        {images.map((image) => {
          return <GifItem key={image.id} {...image} />;
        })}
      </div>
    </>
  );
};
