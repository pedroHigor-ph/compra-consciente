import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🌱</span>
          <span>Compra Consciente</span>
        </Link>

        <nav className="nav">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/comparador">Comparar</NavLink>
          <NavLink to="/economia">Economia</NavLink>
          <NavLink to="/aprenda">Aprenda</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;