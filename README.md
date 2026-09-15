# Pesquisa & Ordenação — Laboratório Interativo de Algoritmos

Aprenda algoritmos de ordenação vendo eles funcionarem: o backend executa cada algoritmo registrando todos os passos, e o frontend reproduz a execução como animação.

```text
pesquisaOrdenacao/
├── backend/    Java 21 + Spring Boot 4 — API REST (porta 8080)
├── frontend/   React + TypeScript + Vite (porta 5173)
└── docs/       documentação do projeto
```

## Requisitos

* JDK 21
* Node.js 20+ e npm

## Executando

Em dois terminais:

```bash
# 1. Backend
cd backend
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run

# 2. Frontend
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

Em desenvolvimento, o Vite repassa as chamadas `/api` para `http://localhost:8080` (configurável com a variável `BACKEND_URL`). Para apontar o frontend para outro backend no build, defina `VITE_API_BASE_URL`.

## Testes

```bash
cd backend && ./mvnw test
cd frontend && npm test
```

## Deploy

O backend vai para o **Railway** e o frontend para o **Cloudflare Pages**. Como cada um precisa do endereço do outro, a ordem é: backend, frontend e, por fim, o CORS do backend.

### 1. Backend no Railway

1. *New Project → Deploy from GitHub repo* e escolha este repositório.
2. Em *Settings*, defina **Root Directory** como `backend`. O Railway encontra o `backend/Dockerfile` e o usa no build (Java 21).
3. Em *Settings → Networking*, clique em **Generate Domain** e anote o endereço (ex.: `https://pesquisa-ordenacao.up.railway.app`).

A porta não precisa ser configurada: o Railway informa a variável `PORT` e o `application.properties` já a usa.

### 2. Frontend no Cloudflare Pages

1. *Workers & Pages → Create → Pages → Connect to Git* e escolha este repositório.
2. Configuração de build:

   | Campo | Valor |
   | --- | --- |
   | Framework preset | Vite |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `frontend` |

3. Em *Environment variables*, crie `VITE_API_BASE_URL` com o endereço do Railway, **em Production e em Preview**. Ela é lida durante o build: se mudar, faça um novo deploy.

A versão do Node vem de `frontend/.node-version`. Não é preciso configurar redirecionamento para as rotas do React: sem um `404.html`, o Pages entrega o `index.html` em qualquer caminho.

### 3. CORS no Railway

Em *Variables* do serviço no Railway, crie:

```text
APP_CORS_ALLOWED_ORIGINS=https://<projeto>.pages.dev,https://*.<projeto>.pages.dev
```

A segunda origem libera os deploys de preview do Pages (`https://<hash>.<projeto>.pages.dev`). Se usar um domínio próprio, acrescente-o à lista.

### Variáveis de ambiente

| Onde | Variável | Obrigatória | Padrão |
| --- | --- | --- | --- |
| Railway | `APP_CORS_ALLOWED_ORIGINS` | sim | `http://localhost:5173,http://localhost:3000` |
| Railway | `PORT` | definida pelo Railway | `8080` |
| Railway | `SORTING_MAX_ARRAY_SIZE`, `BENCHMARK_MAX_SIZE`, `BENCHMARK_MIN_RUNS`, `APP_MAX_REQUEST_SIZE_BYTES` | não | valores do `application.properties` |
| Cloudflare Pages | `VITE_API_BASE_URL` | sim | vazio (mesma origem) |

## Frontend — organização

```text
frontend/src/
├── api/                 tipos dos DTOs e client HTTP (listAlgorithms, getAlgorithm, executeAlgorithm)
├── design/              tokens do design system (cores, tipografia, espaçamento) e estilos globais
├── components/          componentes reutilizáveis: Button, Badge, Section, CodeBlock, Tooltip, StatusMessage, layout
├── hooks/               useAsync
├── features/
│   ├── lab/             laboratório: geradores de entrada, player dos ExecutionSteps, barras, controles
│   ├── algorithms/      página de algoritmo, conteúdo didático dos 8 algoritmos, ilustrações
│   ├── compare/         comparador lado a lado, gráfico de métricas e conclusão textual
│   └── benchmark/       tabela de tempos no formato do quadro comparativo de Wirth
├── pages/               Início, Fundamentos, 404
└── test/                setup e fixtures dos testes
```

Rotas: `/`, `/fundamentos`, `/algoritmos`, `/algoritmos/:id`, `/comparar?algoritmos=a,b`, `/tempos`.
