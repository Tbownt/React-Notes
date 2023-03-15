import { useState } from "react";
import { AddCategory, GifGrid } from "./components";

const GifExpertApp = () => {
  const [categories, setCategories] = useState([]);

  const onAddCategory = (onNewCategory) => {
    if (categories.includes(onNewCategory)) return;
    setCategories([onNewCategory, ...categories]);
  };

  const onDeleteCategory = (index) => {
    setCategories(categories.filter((ele, ind) => ind !== index));
  };

  return (
    <>
      <h1 aria-label="title">Gif Expert App</h1>

      <AddCategory
        onNewCategory={(event) => onAddCategory(event)}
        categories={categories}
      />

      {categories.map((category, index) => (
        <GifGrid
          category={category}
          key={category}
          onDeleteCategory={() => onDeleteCategory(index)}
        />
      ))}
    </>
  );
};

export default GifExpertApp;
