import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import api from "../../services/api";
import "./Comparator.css";


const MAX_PRODUCTS = 5;

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  quantity: "",
  unit: "kg",
};


function Comparator() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const productFromCatalog =
    location.state?.product;

  const [products, setProducts] = useState(() => {
    if (productFromCatalog) {
      return [
        {
          name: productFromCatalog.name,
          price: String(
            productFromCatalog.price
          ),
          quantity: String(
            productFromCatalog.quantity
          ),
          unit: productFromCatalog.unit,
        },
        { ...INITIAL_PRODUCT },
      ];
    }

    return [
      { ...INITIAL_PRODUCT },
      { ...INITIAL_PRODUCT },
    ];
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  function handleChange(index, field, value) {
    setProducts((currentProducts) =>
      currentProducts.map((product, productIndex) =>
        productIndex === index
          ? {
              ...product,
              [field]: value,
            }
          : product
      )
    );

    setError("");
  }


  function addProduct() {
    if (products.length >= MAX_PRODUCTS) {
      return;
    }

    setProducts((currentProducts) => [
      ...currentProducts,
      { ...INITIAL_PRODUCT },
    ]);
  }


  function removeProduct(index) {
    if (products.length <= 2) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (_, productIndex) => productIndex !== index
      )
    );

    setError("");
  }


  function validateProducts() {
    for (let index = 0; index < products.length; index++) {
      const product = products[index];

      if (!product.name.trim()) {
        return `Informe o nome do Produto ${index + 1}.`;
      }

      if (
        product.price === "" ||
        Number(product.price) <= 0
      ) {
        return `Informe um preço válido para o Produto ${index + 1}.`;
      }

      if (
        product.quantity === "" ||
        Number(product.quantity) <= 0
      ) {
        return `Informe uma quantidade válida para o Produto ${index + 1}.`;
      }
    }

    const dimensions = products.map((product) => {
      if (product.unit === "g" || product.unit === "kg") {
        return "mass";
      }

      if (product.unit === "ml" || product.unit === "L") {
        return "volume";
      }

      return "unit";
    });

    const sameDimension = dimensions.every(
      (dimension) => dimension === dimensions[0]
    );

    if (!sameDimension) {
      return (
        "Os produtos da comparação precisam utilizar " +
        "unidades compatíveis."
      );
    }

    return null;
  }


  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const validationError = validateProducts();

    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      products: products.map((product) => ({
        name: product.name.trim(),
        price: Number(product.price),
        quantity: Number(product.quantity),
        unit: product.unit,
      })),
    };

    try {
      setIsLoading(true);

      const response = await api.post(
        "/comparisons",
        payload
      );

      navigate("/resultado", {
        state: {
          comparison: response.data,
        },
      });

    } catch (requestError) {
      console.error(
        "Erro ao realizar comparação:",
        requestError
      );

      const apiMessage =
        requestError.response?.data?.detail;

      if (apiMessage) {
        setError(apiMessage);
      } else {
        setError(
          "Não foi possível realizar a comparação. " +
          "Verifique se a API está funcionando e tente novamente."
        );
      }

    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="comparator-page">

      <section className="comparator-header">
        <span className="page-tag">
          Compra consciente
        </span>

        <h1>Comparador de produtos</h1>

        <p>
          Adicione de 2 a 5 produtos para comparar o
          preço proporcional e descobrir qual opção
          apresenta o menor custo por quantidade.
        </p>
      </section>


      <form
        className="comparison-form"
        onSubmit={handleSubmit}
      >

        <div className="products-list">

          {products.map((product, index) => (
            <div
              className="product-card"
              key={index}
            >

              <div className="product-card-header">

                <h2>
                  Produto {index + 1}
                </h2>

                {products.length > 2 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeProduct(index)}
                    aria-label={`Remover Produto ${index + 1}`}
                  >
                    🗑
                  </button>
                )}

              </div>


              <div className="field-group">

                <label htmlFor={`name-${index}`}>
                  Nome do produto
                </label>

                <input
                  id={`name-${index}`}
                  type="text"
                  placeholder="Ex.: Arroz"
                  value={product.name}
                  onChange={(event) =>
                    handleChange(
                      index,
                      "name",
                      event.target.value
                    )
                  }
                  maxLength={100}
                />

              </div>


              <div className="product-fields">

                <div className="field-group">

                  <label htmlFor={`price-${index}`}>
                    Preço (R$)
                  </label>

                  <input
                    id={`price-${index}`}
                    type="number"
                    placeholder="Ex.: 15,90"
                    value={product.price}
                    onChange={(event) =>
                      handleChange(
                        index,
                        "price",
                        event.target.value
                      )
                    }
                    min="0"
                    step="0.01"
                  />

                </div>


                <div className="field-group">

                  <label htmlFor={`quantity-${index}`}>
                    Quantidade
                  </label>

                  <input
                    id={`quantity-${index}`}
                    type="number"
                    placeholder="Ex.: 500"
                    value={product.quantity}
                    onChange={(event) =>
                      handleChange(
                        index,
                        "quantity",
                        event.target.value
                      )
                    }
                    min="0"
                    step="0.001"
                  />

                </div>


                <div className="field-group">

                  <label htmlFor={`unit-${index}`}>
                    Unidade
                  </label>

                  <select
                    id={`unit-${index}`}
                    value={product.unit}
                    onChange={(event) =>
                      handleChange(
                        index,
                        "unit",
                        event.target.value
                      )
                    }
                  >
                    <option value="kg">
                      kg
                    </option>

                    <option value="g">
                      g
                    </option>

                    <option value="L">
                      L
                    </option>

                    <option value="ml">
                      ml
                    </option>

                    <option value="un">
                      unidade
                    </option>
                  </select>

                </div>

              </div>

            </div>
          ))}

        </div>


        {products.length < MAX_PRODUCTS && (
          <button
            type="button"
            className="add-product-button"
            onClick={addProduct}
          >
            + Adicionar produto
          </button>
        )}


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
          className="compare-button"
          disabled={isLoading}
        >
          {isLoading
            ? "Comparando..."
            : "Comparar produtos"}
        </button>


        <div className="comparison-tip">
          <span>💡</span>

          <p>
            Dica: compare produtos que utilizem
            unidades compatíveis, como kg com g,
            litros com ml ou unidade com unidade.
          </p>
        </div>

      </form>

    </div>
  );
}


export default Comparator;