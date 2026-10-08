import { useState } from "react";

import api from "../../services/api";
import "./Savings.css";


function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}


function Savings() {
  const [currentPrice, setCurrentPrice] = useState("");
  const [alternativePrice, setAlternativePrice] = useState("");
  const [monthlyPurchases, setMonthlyPurchases] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  function validateForm() {
    if (
      currentPrice === "" ||
      Number(currentPrice) <= 0
    ) {
      return "Informe um preço atual válido.";
    }

    if (
      alternativePrice === "" ||
      Number(alternativePrice) <= 0
    ) {
      return "Informe um preço alternativo válido.";
    }

    if (
      monthlyPurchases === "" ||
      Number(monthlyPurchases) <= 0
    ) {
      return "Informe uma quantidade válida de compras por mês.";
    }

    return null;
  }


  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setResult(null);

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      current_price: Number(currentPrice),
      alternative_price: Number(alternativePrice),
      monthly_purchases: Number(monthlyPurchases),
    };

    try {
      setIsLoading(true);

      const response = await api.post(
        "/savings",
        payload
      );

      setResult(response.data);

    } catch (requestError) {
      console.error(
        "Erro ao calcular economia:",
        requestError
      );

      const apiMessage =
        requestError.response?.data?.detail;

      if (apiMessage) {
        setError(apiMessage);
      } else {
        setError(
          "Não foi possível calcular a economia. " +
          "Verifique se a API está funcionando e tente novamente."
        );
      }

    } finally {
      setIsLoading(false);
    }
  }


  function clearForm() {
    setCurrentPrice("");
    setAlternativePrice("");
    setMonthlyPurchases("");
    setResult(null);
    setError("");
  }


  return (
    <div className="savings-page">

      {/* Cabeçalho */}
      <section className="savings-header">

        <span className="page-tag">
          Economia sustentável
        </span>

        <h1>
          Simulador de economia
        </h1>

        <p>
          Veja quanto uma diferença de preço pode
          representar no seu orçamento ao longo do mês
          e do ano.
        </p>

      </section>


      {/* Conteúdo principal */}
      <div className="savings-layout">

        {/* Formulário */}
        <section className="savings-card">

          <div className="card-heading">

            <h2>
              Informe os valores
            </h2>

            <p>
              Use valores de uma compra que você
              costuma fazer.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="field-group">

              <label htmlFor="current-price">
                Preço atual
              </label>

              <div className="money-input">

                <span>R$</span>

                <input
                  id="current-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="10,00"
                  value={currentPrice}
                  onChange={(event) =>
                    setCurrentPrice(
                      event.target.value
                    )
                  }
                />

              </div>

            </div>


            <div className="field-group">

              <label htmlFor="alternative-price">
                Preço da alternativa
              </label>

              <div className="money-input">

                <span>R$</span>

                <input
                  id="alternative-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="8,50"
                  value={alternativePrice}
                  onChange={(event) =>
                    setAlternativePrice(
                      event.target.value
                    )
                  }
                />

              </div>

            </div>


            <div className="field-group">

              <label htmlFor="monthly-purchases">
                Compras por mês
              </label>

              <input
                id="monthly-purchases"
                type="number"
                min="1"
                step="1"
                placeholder="4"
                value={monthlyPurchases}
                onChange={(event) =>
                  setMonthlyPurchases(
                    event.target.value
                  )
                }
              />

            </div>


            {error && (
              <div
                className="error-message"
                role="alert"
              >
                {error}
              </div>
            )}


            <button
              type="submit"
              className="calculate-button"
              disabled={isLoading}
            >
              {isLoading
                ? "Calculando..."
                : "Calcular economia"}
            </button>

          </form>

        </section>


        {/* Resultado */}
        <section className="savings-result">

          {!result && (
            <div className="empty-savings">

              <div className="empty-icon">
                💰
              </div>

              <h2>
                Seu resultado aparecerá aqui
              </h2>

              <p>
                Preencha os valores ao lado para
                descobrir quanto você pode economizar.
              </p>

            </div>
          )}


          {result && result.alternative_is_cheaper && (
            <div className="result-content">

              <div className="success-badge">
                ✓ Alternativa mais econômica
              </div>

              <h2>
                Sua economia estimada
              </h2>

              <div className="main-saving">

                <span>
                  Economia anual
                </span>

                <strong>
                  {formatCurrency(
                    result.annual_saving
                  )}
                </strong>

              </div>


              <div className="saving-cards">

                <div className="saving-card">

                  <span>
                    Por compra
                  </span>

                  <strong>
                    {formatCurrency(
                      result.saving_per_purchase
                    )}
                  </strong>

                </div>


                <div className="saving-card">

                  <span>
                    Por mês
                  </span>

                  <strong>
                    {formatCurrency(
                      result.monthly_saving
                    )}
                  </strong>

                </div>

              </div>


              <div className="calculation-summary">

                <p>
                  Você economiza
                  {" "}
                  <strong>
                    {formatCurrency(
                      result.saving_per_purchase
                    )}
                  </strong>
                  {" "}
                  por compra ao escolher a
                  alternativa.
                </p>

              </div>


              <button
                type="button"
                className="new-calculation-button"
                onClick={clearForm}
              >
                Fazer nova simulação
              </button>

            </div>
          )}


          {result && !result.alternative_is_cheaper && (
            <div className="result-content">

              <div className="warning-badge">
                ⚠ Atenção ao preço
              </div>

              <h2>
                Esta alternativa não gera economia
              </h2>

              <p className="warning-text">
                {result.message}
              </p>

              <div className="price-comparison">

                <div>
                  <span>
                    Preço atual
                  </span>

                  <strong>
                    {formatCurrency(
                      result.current_price
                    )}
                  </strong>
                </div>

                <div className="comparison-arrow">
                  →
                </div>

                <div>
                  <span>
                    Alternativa
                  </span>

                  <strong>
                    {formatCurrency(
                      result.alternative_price
                    )}
                  </strong>
                </div>

              </div>


              <button
                type="button"
                className="new-calculation-button"
                onClick={clearForm}
              >
                Fazer nova simulação
              </button>

            </div>
          )}

        </section>

      </div>


      {/* Informação educativa */}
      <section className="savings-info">

        <div className="info-icon">
          💡
        </div>

        <div>

          <h2>
            Pense no longo prazo
          </h2>

          <p>
            Uma diferença pequena em uma compra pode
            representar uma economia significativa quando
            a compra é repetida várias vezes durante o ano.
          </p>

        </div>

      </section>

    </div>
  );
}


export default Savings;