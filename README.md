# Compra Consciente

## Tecnologia aplicada à educação para o consumo sustentável e à economia familiar

O **Compra Consciente** é uma plataforma web educativa desenvolvida no contexto de um projeto de extensão universitária do curso de Engenharia de Software.

O projeto tem como objetivo auxiliar a comunidade a comparar produtos de forma proporcional, compreender melhor seus custos e adotar práticas de consumo mais conscientes e economicamente eficientes.

---

## Objetivo

Desenvolver e utilizar uma plataforma web educativa que auxilie moradores da comunidade a:

- comparar preços de produtos;
- compreender preços por unidade de medida;
- identificar o menor preço proporcional;
- simular possíveis economias;
- aprender práticas relacionadas ao consumo consciente;
- refletir sobre consumo, desperdício e planejamento financeiro.

---

## Relação com os ODS

O projeto está relacionado aos seguintes Objetivos de Desenvolvimento Sustentável:

- **ODS 1 — Erradicação da pobreza**
- **ODS 4 — Educação de qualidade**
- **ODS 8 — Trabalho decente e crescimento econômico**
- **ODS 12 — Consumo e produção responsáveis**
- **ODS 13 — Ação contra a mudança global do clima**

---

## Funcionalidades

### Comparador de produtos

Permite comparar de 2 a 5 produtos utilizando unidades compatíveis.

Exemplos:

- g e kg;
- ml e L;
- unidades.

O sistema normaliza as quantidades para realizar uma comparação proporcional.

### Simulador de economia

Permite informar:

- preço atual;
- preço da alternativa;
- quantidade de compras por mês.

A plataforma calcula:

- economia por compra;
- economia mensal;
- economia anual.

### Área educativa

Disponibiliza conteúdos relacionados a:

- consumo consciente;
- sustentabilidade;
- planejamento;
- desperdício;
- educação para o consumo.

### Catálogo

Apresenta produtos de demonstração cadastrados no banco de dados.

### Feedback

Permite que o usuário avalie sua experiência com a plataforma sem necessidade de cadastro ou identificação pessoal.

---

## Tecnologias

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- PyMySQL
- Pydantic Settings

### Banco de dados

- MySQL

### Testes

- pytest
- httpx

### Versionamento

- Git
- GitHub

---

## Arquitetura

```text
React
   ↓
Axios
   ↓
FastAPI
   ↓
Services
   ↓
SQLAlchemy
   ↓
MySQL