import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import api from "../../services/api";
import "./Article.css";


function Article() {
  const { slug } = useParams();

  const [content, setContent] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchContent();
  }, [slug]);


  async function fetchContent() {
    try {
      setIsLoading(true);
      setError("");

      const response = await api.get(
        `/educational-contents/${slug}`
      );

      setContent(response.data);

    } catch (requestError) {
      console.error(
        "Erro ao carregar conteúdo:",
        requestError
      );

      if (
        requestError.response?.status === 404
      ) {
        setError(
          "O conteúdo que você está procurando não foi encontrado."
        );
      } else {
        setError(
          "Não foi possível carregar este conteúdo. " +
          "Verifique se a API está funcionando."
        );
      }

    } finally {
      setIsLoading(false);
    }
  }


  if (isLoading) {
    return (
      <div className="article-page">
        <div className="article-loading">
          <div className="loading-spinner" />

          <p>
            Carregando conteúdo...
          </p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="article-page">

        <section className="article-error">

          <div className="error-icon">
            ⚠
          </div>

          <h1>
            Não foi possível abrir o conteúdo.
          </h1>

          <p>
            {error}
          </p>

          <Link
            to="/aprenda"
            className="primary-button"
          >
            Voltar para Aprenda
          </Link>

        </section>

      </div>
    );
  }


  return (
    <div className="article-page">

      <article className="article">

        <Link
          to="/aprenda"
          className="back-link"
        >
          ← Voltar para Aprenda
        </Link>


        <div className="article-category">
          {getCategoryLabel(
            content.category
          )}
        </div>


        <h1>
          {content.title}
        </h1>


        <p className="article-summary">
          {content.summary}
        </p>


        <div className="article-divider" />


        <div className="article-content">
          {content.content}
        </div>

      </article>


      <section className="article-cta">

        <div>

          <span className="page-tag">
            Coloque em prática
          </span>

          <h2>
            Quer comparar um produto?
          </h2>

          <p>
            Use o comparador para colocar em prática
            o que você aprendeu.
          </p>

        </div>


        <Link
          to="/comparador"
          className="primary-button"
        >
          Comparar produtos
        </Link>

      </section>

    </div>
  );
}


function getCategoryLabel(category) {
  const categoryLabels = {
    consumo: "Consumo",
    sustentabilidade: "Sustentabilidade",
    planejamento: "Planejamento",
    desperdicio: "Desperdício",
    educacao: "Educação",
    outros: "Outros",
  };

  return (
    categoryLabels[category] ||
    "Outros"
  );
}


export default Article;