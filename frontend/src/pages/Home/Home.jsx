import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            Economia sustentável
          </span>

          <h1>
            Compre pelo custo real,
            <span> não apenas pelo preço da embalagem.</span>
          </h1>

          <p>
            Compare preços, quantidades e unidades de medida
            para fazer escolhas mais conscientes, economizar
            e reduzir desperdícios.
          </p>

          <Link to="/comparador" className="primary-button">
            Comparar produtos
          </Link>
        </div>

        <div className="hero-illustration">
          <div className="shopping-card">
            <div className="shopping-icon">🛒</div>

            <div className="leaf-icon">🌱</div>
          </div>
        </div>
      </section>

      {/* Exemplo */}
      <section className="example-section">
        <div className="section-heading">
          <span className="section-tag">
            Na prática
          </span>

          <h2>
            O preço da embalagem não conta toda a história.
          </h2>

          <p>
            Veja como o site transforma preços diferentes
            em uma comparação justa.
          </p>
        </div>

        <div className="example-card">
          <div className="example-product">
            <span>Produto A</span>

            <strong>R$ 15,00</strong>

            <small>500 g</small>
          </div>

          <div className="example-arrow">
            →
          </div>

          <div className="example-result">
            <span>Preço proporcional</span>

            <strong>R$ 30,00/kg</strong>
          </div>
        </div>

        <div className="example-card second-example">
          <div className="example-product">
            <span>Produto B</span>

            <strong>R$ 22,00</strong>

            <small>1 kg</small>
          </div>

          <div className="example-arrow">
            →
          </div>

          <div className="example-result">
            <span>Preço proporcional</span>

            <strong>R$ 22,00/kg</strong>
          </div>
        </div>

        <p className="example-conclusion">
          Mesmo custando mais na embalagem, o Produto B
          apresenta menor preço proporcional.
        </p>
      </section>

      {/* Benefícios */}
      <section className="benefits-section">
        <div className="section-heading">
          <span className="section-tag">
            Por que usar?
          </span>

          <h2>
            Pequenas escolhas podem fazer diferença.
          </h2>
        </div>

        <div className="benefits-grid">
          <article className="benefit-card">
            <div className="benefit-icon">💰</div>

            <h3>
              Economize dinheiro
            </h3>

            <p>
              Compare o preço real dos produtos e
              encontre alternativas mais econômicas.
            </p>
          </article>

          <article className="benefit-card">
            <div className="benefit-icon">🛒</div>

            <h3>
              Consuma de forma consciente
            </h3>

            <p>
              Entenda melhor suas escolhas antes
              de colocar um produto no carrinho.
            </p>
          </article>

          <article className="benefit-card">
            <div className="benefit-icon">🌱</div>

            <h3>
              Reduza desperdícios
            </h3>

            <p>
              Planejamento e comparação ajudam a
              evitar compras desnecessárias.
            </p>
          </article>
        </div>
      </section>

      {/* ODS */}
      <section className="ods-section">
        <div className="section-heading">
          <span className="section-tag">
            Projeto de extensão
          </span>

          <h2>
            Tecnologia a serviço do consumo responsável.
          </h2>

          <p>
            O Compra Consciente foi desenvolvido dentro
            da trilha de Economia Sustentável.
          </p>
        </div>

        <div className="ods-grid">
          <article className="ods-card">
            <span className="ods-number">
              1
            </span>

            <h3>
              Erradicação da pobreza
            </h3>

            <p>
              Incentiva o uso mais eficiente dos
              recursos financeiros.
            </p>
          </article>

          <article className="ods-card">
            <span className="ods-number">
              4
            </span>

            <h3>
              Educação de qualidade
            </h3>

            <p>
              Promove educação prática para decisões
              de consumo.
            </p>
          </article>

          <article className="ods-card">
            <span className="ods-number">
              8
            </span>

            <h3>
              Trabalho decente
            </h3>

            <p>
              Estimula conhecimentos econômicos e
              digitais aplicáveis ao cotidiano.
            </p>
          </article>

          <article className="ods-card">
            <span className="ods-number">
              12
            </span>

            <h3>
              Consumo responsável
            </h3>

            <p>
              Incentiva escolhas conscientes e
              redução de desperdícios.
            </p>
          </article>

          <article className="ods-card">
            <span className="ods-number">
              13
            </span>

            <h3>
              Ação climática
            </h3>

            <p>
              Relaciona hábitos de consumo aos seus
              impactos ambientais.
            </p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div>
          <span className="section-tag">
            Comece agora
          </span>

          <h2>
            Antes de comprar, compare.
          </h2>

          <p>
            Use o comparador para descobrir qual
            produto apresenta o menor preço proporcional.
          </p>

          <Link
            to="/comparador"
            className="primary-button"
          >
            Abrir comparador
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;