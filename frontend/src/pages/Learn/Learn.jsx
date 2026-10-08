import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import "./Learn.css";


const categories = [
  {
    value: "",
    label: "Todos",
  },
  {
    value: "consumo",
    label: "Consumo",
  },
  {
    value: "sustentabilidade",
    label: "Sustentabilidade",
  },
  {
    value: "planejamento",
    label: "Planejamento",
  },
  {
    value: "desperdicio",
    label: "Desperdício",
  },
  {
    value: "educacao",
    label: "Educação",
  },
];


function Learn() {
  const [contents, setContents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchContents();
  }, [selectedCategory]);


  async function fetchContents() {
    try {
      setIsLoading(true);
      setError("");

      const params = selectedCategory
        ? {
            category: selectedCategory,
          }
        : {};

      const response = await api.get(
        "/educational-contents",
        {
          params,
        }
      );

      setContents(response.data);

    } catch (requestError) {
      console.error(
        "Erro ao carregar conteúdos:",
        requestError
      );

      const apiMessage =
        requestError.response?.data?.detail;

      setError(
        apiMessage ||
        "Não foi possível carregar os conteúdos. " +
        "Verifique se a API está funcionando."
      );

    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="learn-page">

      {/* Cabeçalho */}
      <section className="learn-header">

        <span className="page-tag">
          Educação para o consumo
        </span>

        <h1>
          Aprenda a comprar de forma mais consciente.
        </h1>

        <p>
          Entenda como pequenas mudanças na forma de
          comparar, planejar e consumir podem ajudar
          no seu orçamento e reduzir desperdícios.
        </p>

      </section>


      {/* Categorias */}
      <section className="category-section">

        <div className="category-list">

          {categories.map((category) => (

            <button
              key={category.value}
              type="button"
              className={
                selectedCategory === category.value
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() =>
                setSelectedCategory(
                  category.value
                )
              }
            >
              {category.label}
            </button>

          ))}

        </div>

      </section>


      {/* Conteúdos */}
      <section className="contents-section">

        {isLoading && (
          <div className="loading-state">
            <div className="loading-spinner" />

            <p>
              Carregando conteúdos...
            </p>
          </div>
        )}


        {!isLoading && error && (
          <div
            className="error-state"
            role="alert"
          >
            <div className="error-icon">
              ⚠
            </div>

            <h2>
              Não foi possível carregar os conteúdos.
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="retry-button"
              onClick={fetchContents}
            >
              Tentar novamente
            </button>
          </div>
        )}


        {!isLoading &&
          !error &&
          contents.length === 0 && (
            <div className="empty-state">

              <div className="empty-icon">
                📚
              </div>

              <h2>
                Nenhum conteúdo encontrado.
              </h2>

              <p>
                Não encontramos conteúdos para a
                categoria selecionada.
              </p>

            </div>
          )}


        {!isLoading &&
          !error &&
          contents.length > 0 && (

            <div className="contents-grid">

              {contents.map((content) => (

                <article
                  className="content-card"
                  key={content.id}
                >

                  <div className="content-card-top">

                    <span className="content-category">
                      {getCategoryLabel(
                        content.category
                      )}
                    </span>

                  </div>


                  <div className="content-card-body">

                    <h2>
                      {content.title}
                    </h2>

                    <p>
                      {content.summary}
                    </p>

                    <Link
                      to={`/aprenda/${content.slug}`}
                      className="read-more"
                    >
                      Ler conteúdo →
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          )}

      </section>


      {/* Chamada para o comparador */}
      <section className="learn-cta">

        <div>

          <span className="page-tag">
            Coloque em prática
          </span>

          <h2>
            Aprendeu? Agora compare.
          </h2>

          <p>
            Utilize o conhecimento para descobrir
            qual produto apresenta o menor preço
            proporcional.
          </p>

        </div>

        <Link
          to="/comparador"
          className="primary-button"
        >
          Abrir comparador
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


export default Learn;