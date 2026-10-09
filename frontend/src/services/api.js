import axios from "axios";

// Remove barras no final para evitar URLs como ".../api/v1//products".
const baseURL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

if (!baseURL) {
  console.error(
    "VITE_API_URL não está definida. Configure a variável de ambiente " +
    "(ex.: https://<dominio-do-backend>/api/v1) e refaça o build/deploy."
  );
}

const api = axios.create({
  baseURL,
  // Evita ficar carregando para sempre (ex.: banco acordando no Neon).
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
