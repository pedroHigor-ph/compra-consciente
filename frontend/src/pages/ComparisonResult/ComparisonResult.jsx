import { Link, useLocation } from "react-router-dom";
import "./ComparisonResult.css";


function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}


function formatQuantity(value) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 3,
  }).format(value);
}


function ComparisonResult() {
  const location = useLocation();

  const comparison = location.state?.comparison;


  if (!comparison) {
    return (
      <div className="result-page">
        <section className="empty-result">
          <div className="empty-result-icon">
            📊
          </div>

          <h1>
            Nenhuma comparação encontrada
          </h1>

          <p>
            Faça uma comparação de produtos para
            visualizar os resultados aqui.
          </p>

          <Link
            to="/comparador"
            className="primary-button"
          >
            Ir para o comparador
          </Link>
        </section>
      </div>
    );
  }


  const products = comparison.products;

  const lowestPrice =
    comparison.lowest_unit_price;

  const highestUnitPrice = Math.max(
    ...products.map(
      (product) => product.unit_price
    )
  );


  return (
    <div className="result-page">

      {/* Cabeçalho */}
      <section className="result-header">
        <span className="page-tag">
          Resultado
        </span>

        <h1>
          Resultado da comparação
        </h1>

        <p>
          Os produtos estão organizados do menor
          para o maior preço proporcional.
        </p>
      </section>


      {/* Menor preço */}
      <section className="winner-card">

        <div className="winner-icon">
          🏆
        </div>

        <div className="winner-content">

          <span className="winner-label">
            Menor preço proporcional
          </span>

          <h2>
            {lowestPrice.name}
          </h2>

          <strong>
            {formatCurrency(
              lowestPrice.unit_price
            )}
            <small>
              /{lowestPrice.unit}
            </small>
          </strong>

        </div>

      </section>


      {/* Tabela */}
      <section className="result-section">

        <div className="section-heading">
          <h2>
            Comparação detalhada
          </h2>

          <p>
            Veja quanto cada produto custa por
            {` ${comparison.comparison_unit}`}.
          </p>
        </div>


        <div className="table-wrapper">

          <table className="comparison-table">

            <thead>
              <tr>
                <th>Pos.</th>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Preço proporcional</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={`${product.name}-${product.position}`}
                  className={
                    product.unit_price ===
                    lowestPrice.unit_price
                      ? "winner-row"
                      : ""
                  }
                >

                  <td>
                    <span className="position-number">
                      {product.position}
                    </span>
                  </td>

                  <td>
                    <strong>
                      {product.name}
                    </strong>
                  </td>

                  <td>
                    {formatCurrency(
                      product.original_price
                    )}
                  </td>

                  <td>
                    {formatQuantity(
                      product.original_quantity
                    )}{" "}
                    {product.original_unit}
                  </td>

                  <td>
                    <strong className="unit-price">
                      {formatCurrency(
                        product.unit_price
                      )}
                      /{product.normalized_unit}
                    </strong>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>


      {/* Gráfico */}
      <section className="result-section chart-section">

        <div className="section-heading">
          <h2>
            Comparação de preços proporcionais
          </h2>

          <p>
            Quanto menor a barra, menor o preço
            proporcional do produto.
          </p>
        </div>


        <div className="chart-card">

          {products.map((product) => {

            const barWidth =
              highestUnitPrice === 0
                ? 0
                : (
                    product.unit_price /
                    highestUnitPrice
                  ) * 100;


            return (
              <div
                className="chart-row"
                key={`chart-${product.name}-${product.position}`}
              >

                <div className="chart-label">
                  <strong>
                    {product.name}
                  </strong>

                  <span>
                    {formatCurrency(
                      product.unit_price
                    )}
                    /{product.normalized_unit}
                  </span>
                </div>


                <div className="chart-track">

                  <div
                    className={
                      product.unit_price ===
                      lowestPrice.unit_price
                        ? "chart-bar winner-bar"
                        : "chart-bar"
                    }
                    style={{
                      width: `${barWidth}%`,
                    }}
                  />

                </div>

              </div>
            );

          })}

        </div>

      </section>


      {/* Ação */}
      <section className="result-actions">

        <Link
          to="/comparador"
          className="primary-button"
        >
          Fazer nova comparação
        </Link>

        <Link
          to="/"
          className="secondary-button"
        >
          Voltar para o início
        </Link>

      </section>

    </div>
  );
}


export default ComparisonResult;