import { useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import "./About.css";


const odsData = [
  {
    number: 1,
    title: "Erradicação da pobreza",
    description:
      "Estimula o uso mais eficiente dos recursos financeiros e ajuda o consumidor a identificar oportunidades de economia.",
  },
  {
    number: 4,
    title: "Educação de qualidade",
    description:
      "Oferece educação prática sobre comparação de preços, planejamento de compras e consumo consciente.",
  },
  {
    number: 8,
    title: "Trabalho decente e crescimento econômico",
    description:
      "Contribui para o desenvolvimento de conhecimentos econômicos e digitais aplicáveis ao cotidiano.",
  },
  {
    number: 12,
    title: "Consumo e produção responsáveis",
    description:
      "Incentiva decisões de compra mais conscientes e a redução de desperdícios.",
  },
  {
    number: 13,
    title: "Ação contra a mudança global do clima",
    description:
      "Apresenta a relação entre hábitos de consumo, desperdício e impactos ambientais.",
  },
];


function About() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [activityContext, setActivityContext] =
    useState("oficina");

  const [isSending, setIsSending] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] =
    useState("");


  function selectRating(value) {
    setRating(value);
    setFeedbackError("");
    setFeedbackSent(false);
  }


  async function handleFeedbackSubmit(event) {
    event.preventDefault();

    setFeedbackError("");
    setFeedbackSent(false);


    if (rating === 0) {
      setFeedbackError(
        "Selecione uma avaliação de 1 a 5 estrelas."
      );

      return;
    }


    try {
      setIsSending(true);

      await api.post(
        "/feedbacks",
        {
          rating,
          comment:
            comment.trim() || null,
          activity_context: activityContext,
        }
      );

      setFeedbackSent(true);

      setRating(0);
      setComment("");
      setActivityContext("oficina");

    } catch (requestError) {
      console.error(
        "Erro ao enviar feedback:",
        requestError
      );

      const apiMessage =
        requestError.response?.data?.detail;

      setFeedbackError(
        apiMessage ||
        "Não foi possível enviar seu feedback. " +
        "Tente novamente."
      );

    } finally {
      setIsSending(false);
    }
  }


  return (
    <div className="about-page">

      {/* Cabeçalho */}
      <section className="about-header">

        <span className="page-tag">
          Projeto de extensão
        </span>

        <h1>
          Sobre o Compra Consciente
        </h1>

        <p>
          Uma solução tecnológica desenvolvida no curso
          de Engenharia de Software para promover educação
          para o consumo sustentável.
        </p>

      </section>


      {/* Projeto */}
      <section className="about-section">

        <div className="section-label">
          O projeto
        </div>

        <h2>
          Tecnologia aplicada a um problema do cotidiano
        </h2>

        <p>
          O Compra Consciente é uma plataforma web que
          auxilia consumidores a comparar produtos levando
          em consideração preço, quantidade e unidade de
          medida.
        </p>

        <p>
          A proposta é mostrar que o menor preço apresentado
          na embalagem nem sempre representa o menor custo
          proporcional, incentivando decisões de compra
          mais conscientes.
        </p>

      </section>


      {/* Como funciona */}
      <section className="about-section">

        <div className="section-label">
          Como funciona
        </div>

        <div className="process-grid">

          <article className="process-card">

            <span className="process-number">
              1
            </span>

            <h3>
              Informe os produtos
            </h3>

            <p>
              Digite o preço, a quantidade e a unidade
              de medida dos produtos.
            </p>

          </article>


          <article className="process-card">

            <span className="process-number">
              2
            </span>

            <h3>
              O sistema calcula
            </h3>

            <p>
              Os valores são normalizados e o preço
              proporcional é calculado automaticamente.
            </p>

          </article>


          <article className="process-card">

            <span className="process-number">
              3
            </span>

            <h3>
              Compare
            </h3>

            <p>
              Os produtos são organizados do menor para
              o maior preço proporcional.
            </p>

          </article>

        </div>

      </section>


      {/* Tecnologias */}
      <section className="technology-section">

        <div className="section-label">
          Engenharia de Software
        </div>

        <h2>
          Tecnologias utilizadas
        </h2>

        <p>
          O projeto foi desenvolvido utilizando uma
          arquitetura web separando frontend, backend
          e banco de dados.
        </p>

        <div className="technology-grid">

          <div className="technology-card">
            <strong>
              React
            </strong>

            <span>
              Interface web
            </span>
          </div>


          <div className="technology-card">
            <strong>
              FastAPI
            </strong>

            <span>
              API REST
            </span>
          </div>


          <div className="technology-card">
            <strong>
              Python
            </strong>

            <span>
              Regras de negócio
            </span>
          </div>


          <div className="technology-card">
            <strong>
              MySQL
            </strong>

            <span>
              Banco de dados
            </span>
          </div>


          <div className="technology-card">
            <strong>
              Git + GitHub
            </strong>

            <span>
              Versionamento
            </span>
          </div>

        </div>

      </section>


      {/* ODS */}
      <section className="ods-about-section">

        <div className="section-label">
          Economia sustentável
        </div>

        <h2>
          Objetivos de Desenvolvimento Sustentável
        </h2>

        <p>
          O projeto está relacionado às cinco ODS
          definidas para a trilha de Economia Sustentável.
        </p>

        <div className="ods-about-grid">

          {odsData.map((ods) => (

            <article
              className="ods-about-card"
              key={ods.number}
            >

              <span className="ods-number">
                {ods.number}
              </span>

              <div>

                <h3>
                  ODS {ods.number}
                </h3>

                <h4>
                  {ods.title}
                </h4>

                <p>
                  {ods.description}
                </p>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* Extensão */}
      <section className="extension-section">

        <div>

          <span className="page-tag">
            Comunidade
          </span>

          <h2>
            Software que sai da tela e chega à comunidade.
          </h2>

          <p>
            O site será utilizado como ferramenta durante
            uma atividade educativa, na qual os participantes
            poderão aprender a comparar preços, simular
            economias e refletir sobre seus hábitos de consumo.
          </p>

        </div>


        <Link
          to="/comparador"
          className="primary-button"
        >
          Conhecer o comparador
        </Link>

      </section>


      {/* Feedback */}
      <section className="feedback-section">

        <div className="section-label">
          Sua opinião
        </div>

        <h2>
          Como foi sua experiência?
        </h2>

        <p className="feedback-description">
          Sua avaliação ajuda a entender se a ferramenta
          foi útil e a melhorar a atividade de extensão.
        </p>


        <form
          className="feedback-form"
          onSubmit={handleFeedbackSubmit}
        >

          <div className="feedback-field">

            <label>
              Avaliação
            </label>

            <div
              className="rating-list"
              role="radiogroup"
              aria-label="Avaliação de 1 a 5 estrelas"
            >

              {[1, 2, 3, 4, 5].map(
                (value) => (

                  <button
                    key={value}
                    type="button"
                    className={
                      value <= rating
                        ? "rating-star selected"
                        : "rating-star"
                    }
                    onClick={() =>
                      selectRating(value)
                    }
                    aria-label={`${value} estrelas`}
                    aria-pressed={
                      value === rating
                    }
                  >
                    ★
                  </button>

                )
              )}

            </div>

          </div>


          <div className="feedback-field">

            <label htmlFor="activity-context">
              Onde você utilizou a ferramenta?
            </label>

            <select
              id="activity-context"
              value={activityContext}
              onChange={(event) =>
                setActivityContext(
                  event.target.value
                )
              }
            >
              <option value="oficina">
                Oficina
              </option>

              <option value="comparador">
                Comparador
              </option>

              <option value="economia">
                Simulador de economia
              </option>

              <option value="aprenda">
                Área educativa
              </option>

              <option value="catalogo">
                Catálogo
              </option>

              <option value="outros">
                Outro
              </option>

            </select>

          </div>


          <div className="feedback-field">

            <label htmlFor="feedback-comment">
              Comentário
            </label>

            <textarea
              id="feedback-comment"
              rows="5"
              maxLength="1000"
              placeholder="Conte o que você achou da ferramenta..."
              value={comment}
              onChange={(event) =>
                setComment(
                  event.target.value
                )
              }
            />

          </div>


          {feedbackError && (
            <div
              className="feedback-error"
              role="alert"
            >
              {feedbackError}
            </div>
          )}


          {feedbackSent && (
            <div
              className="feedback-success"
              role="status"
            >
              ✓ Obrigado pelo seu feedback!
            </div>
          )}


          <button
            type="submit"
            className="feedback-button"
            disabled={isSending}
          >
            {isSending
              ? "Enviando..."
              : "Enviar feedback"}
          </button>

        </form>

      </section>

    </div>
  );
}


export default About;