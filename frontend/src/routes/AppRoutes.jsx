import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout/Layout";

import Home from "../pages/Home/Home";
import Comparator from "../pages/Comparator/Comparator";
import ComparisonResult from "../pages/ComparisonResult/ComparisonResult";
import Savings from "../pages/Savings/Savings";
import Learn from "../pages/Learn/Learn";
import Article from "../pages/Article/Article";
import Catalog from "../pages/Catalog/Catalog";
import About from "../pages/About/About";


function AppRoutes() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/comparador"
          element={<Comparator />}
        />

        <Route
          path="/resultado"
          element={<ComparisonResult />}
        />

        <Route
          path="/economia"
          element={<Savings />}
        />

        <Route
          path="/aprenda"
          element={<Learn />}
        />

        <Route
          path="/aprenda/:slug"
          element={<Article />}
        />

        <Route
          path="/catalogo"
          element={<Catalog />}
        />

        <Route
          path="/sobre"
          element={<About />}
        />

      </Route>

    </Routes>
  );
}


export default AppRoutes;