import { BarraNav } from "../../ui";
import { DcPage, HeroPage, MarvelPage, SearchPage } from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";

export const HeroesRoutes = () => {
  return (
    <>
      <BarraNav />
      <div className="container">
        <Routes>
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DcPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:id" element={<HeroPage />} />

          <Route path="/" element={<Navigate to="marvel" />} />
        </Routes>
      </div>
    </>
  );
};
