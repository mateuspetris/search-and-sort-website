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
