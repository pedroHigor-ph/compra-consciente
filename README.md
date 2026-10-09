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
- Psycopg 3
- Pydantic Settings

### Banco de dados

- PostgreSQL (Neon)

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
PostgreSQL (Neon)
```

---

## PostgreSQL local e Neon

O schema PostgreSQL está em `backend/sql/schema.postgres.sql`, e os dados de demonstração estão em `backend/sql/seed.postgres.sql`.

1. Crie um banco PostgreSQL no Neon. Para usar Neon pela Vercel, adicione a integração Neon pelo Marketplace e conecte-a ao projeto.
2. Configure `DATABASE_URL` no ambiente do backend. Localmente, crie `backend/.env` (não versionado) com:

   ```env
   DATABASE_URL=postgresql://USUARIO:SENHA@HOST/BANCO?sslmode=require
   FRONTEND_URL=http://localhost:5173
   ```

   Os arquivos `backend/.env.example` e `frontend/.env.example` mostram os valores esperados. Para executar os testes localmente, instale as dependências com `pip install -r requirements-dev.txt` dentro de `backend`.

3. Execute `backend/sql/schema.postgres.sql` na base vazia.
4. Para carregar os dados de demonstração, execute `backend/sql/seed.postgres.sql` uma única vez, depois do schema. O seed preserva IDs e não deve ser repetido nem usado sobre uma base que já tenha dados.

O backend espera que o schema já exista; ele não cria nem apaga tabelas automaticamente. Se for migrar dados de um MySQL existente, faça um backup e carregue os dados em uma base Neon de teste antes da troca definitiva. Os arquivos deste projeto incluem apenas o seed demonstrativo, não dados de produção.

No Vercel, configure dois projetos ligados ao mesmo repositório: um com diretório raiz `backend` para a API e outro com diretório raiz `frontend` para o Vite. No projeto do backend, configure `DATABASE_URL` e `FRONTEND_URL` com o domínio de produção do frontend. No projeto do frontend, configure `VITE_API_URL` com a URL pública da API terminada em `/api/v1`.
