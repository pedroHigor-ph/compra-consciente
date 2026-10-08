import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import "./Catalog.css";


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


function getUnitLabel(unit) {
  const labels = {
    g: "g",
    kg: "kg",
    ml: "ml",
    L: "L",
    un: "unidade",
  };

  return labels[unit] || unit;
}


function Catalog() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadCategories();
  }, []);


  useEffect(() => {
    loadProducts();
  }, [search, selectedCategory]);


  async function loadCategories() {
    try {
      const response = await api.get(
        "/categories"
      );

      setCategories(response.data);

    } catch (requestError) {
      console.error(
        "Erro ao carregar categorias:",
        requestError
      );
    }
  }


  async function loadProducts() {
    try {
      setIsLoading(true);
      setError("");

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (selectedCategory) {
        params.category_id = selectedCategory;
      }

      const response = await api.get(
        "/products",
        {
          params,
        }
      );

      setProducts(response.data);

    } catch (requestError) {
      console.error(
        "Erro ao carregar produtos:",
        requestError
      );

      const apiMessage =
        requestError.response?.data?.detail;

      setError(
        apiMessage ||
        "Não foi possível carregar os produtos. " +
        "Verifique se a API está funcionando."
      );

    } finally {
      setIsLoading(false);
    }
  }


  function handleCompareProduct(product) {
    navigate("/comparador", {
      state: {
        product,
      },
    });
  }


  return (
    <div className="catalog-page">

      {/* Cabeçalho */}
      <section className="catalog-header">

        <span className="page-tag">
          Produtos de demonstração
        </span>

        <h1>
          Catálogo
        </h1>

        <p>
          Explore produtos de exemplo e utilize-os
          para entender como funciona a comparação
          de preços.
        </p>

      </section>


      {/* Busca */}
      <section className="catalog-filters">

        <div className="search-wrapper">

          <span className="search-icon">
            🔎
          </span>

          <input
            type="search"
            placeholder="Buscar produto..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            aria-label="Buscar produto"
          />

        </div>


        <div className="category-list">

          <button
            type="button"
            className={
              selectedCategory === ""
                ? "category-button active"
                : "category-button"
            }
            onClick={() =>
              setSelectedCategory("")
            }
          >
            Todos
          </button>


          {categories.map((category) => (

            <button
              type="button"
              key={category.id}
              className={
                String(selectedCategory) ===
                String(category.id)
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() =>
                setSelectedCategory(
                  String(category.id)
                )
              }
            >
              {category.name}
            </button>

          ))}

        </div>

      </section>


      {/* Conteúdo */}
      <section className="catalog-content">

        {isLoading && (
          <div className="catalog-state">

            <div className="loading-spinner" />

            <p>
              Carregando produtos...
            </p>

          </div>
        )}


        {!isLoading && error && (
          <div
            className="catalog-state"
            role="alert"
          >

            <div className="state-icon">
              ⚠
            </div>

            <h2>
              Não foi possível carregar o catálogo.
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="retry-button"
              onClick={loadProducts}
            >
              Tentar novamente
            </button>

          </div>
        )}


        {!isLoading &&
          !error &&
          products.length === 0 && (

            <div className="catalog-state">

              <div className="state-icon">
                🔎
              </div>

              <h2>
                Nenhum produto encontrado.
              </h2>

              <p>
                Tente alterar o termo da busca ou
                selecionar outra categoria.
              </p>

            </div>

          )}


        {!isLoading &&
          !error &&
          products.length > 0 && (

            <div className="products-grid">

              {products.map((product) => (

                <article
                  className="catalog-card"
                  key={product.id}
                >

                  <div className="catalog-card-category">
                    {getCategoryName(
                      categories,
                      product.category_id
                    )}
                  </div>


                  <div className="catalog-card-body">

                    <h2>
                      {product.name}
                    </h2>

                    {product.description && (
                      <p className="product-description">
                        {product.description}
                      </p>
                    )}


                    <div className="product-price">
                      {formatCurrency(
                        product.price
                      )}
                    </div>


                    <div className="product-quantity">
                      {formatQuantity(
                        product.quantity
                      )}{" "}
                      {getUnitLabel(product.unit)}
                    </div>


                    <button
                      type="button"
                      className="compare-product-button"
                      onClick={() =>
                        handleCompareProduct(
                          product
                        )
                      }
                    >
                      Comparar este produto
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

      </section>


      {/* Informação */}
      <section className="catalog-info">

        <div className="info-icon">
          💡
        </div>

        <div>

          <h2>
            Produtos do catálogo são exemplos
          </h2>

          <p>
            Os preços apresentados no catálogo são
            utilizados apenas para demonstração.
            Eles não representam necessariamente
            os preços praticados nos estabelecimentos.
          </p>

        </div>

      </section>


      {/* CTA */}
      <section className="catalog-cta">

        <div>

          <span className="page-tag">
            Consumo consciente
          </span>

          <h2>
            Quer comparar seus próprios produtos?
          </h2>

          <p>
            Você pode informar manualmente produtos
            encontrados nas suas compras.
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


function getCategoryName(
  categories,
  categoryId
) {
  const category = categories.find(
    (item) => item.id === categoryId
  );

  return category?.name || "Outros";
}


export default Catalog;