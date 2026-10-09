import { Link } from "react-router-dom";
import "./NotFound.css";


function NotFound() {
  return (
    <div className="not-found-page">
      <section className="not-found">
        <div className="not-found-icon">
          🔎
        </div>

        <h1>
          Página não encontrada
        </h1>

        <p>
          O endereço que você acessou não existe ou foi movido.
          Volte para o início e continue explorando a plataforma.
        </p>

        <Link
          to="/"
          className="not-found-button"
        >
          Voltar para o início
        </Link>
      </section>
    </div>
  );
}


export default NotFound;
