import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import { AlgorithmPage } from './features/algorithms/AlgorithmPage';
import { AlgorithmsIndexPage } from './features/algorithms/AlgorithmsIndexPage';
import { BenchmarkPage } from './features/benchmark/BenchmarkPage';
import { ComparePage } from './features/compare/ComparePage';
import { FundamentalsPage } from './pages/FundamentalsPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="fundamentos" element={<FundamentalsPage />} />
        <Route path="algoritmos" element={<AlgorithmsIndexPage />} />
        <Route path="algoritmos/:algorithmId" element={<AlgorithmPage />} />
        <Route path="comparar" element={<ComparePage />} />
        <Route path="tempos" element={<BenchmarkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
