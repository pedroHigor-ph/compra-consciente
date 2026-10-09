/**
 * Converte um erro do axios em uma mensagem de texto segura para exibir na tela.
 *
 * O FastAPI devolve `detail` como string nos erros que o próprio código lança
 * (HTTPException), mas como LISTA de objetos nos erros de validação (422).
 * Renderizar essa lista direto no React derruba a tela, então tratamos os dois casos.
 */
export function getErrorMessage(error, fallback) {
  const detail = error?.response?.data?.detail;

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  if (Array.isArray(detail) && detail.length > 0) {
    const message = detail[0]?.msg;

    if (typeof message === "string" && message.trim()) {
      return message.replace(/^Value error,\s*/i, "");
    }
  }

  return fallback;
}
