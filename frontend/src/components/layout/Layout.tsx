import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import styles from './Layout.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Início', end: true },
  { to: '/fundamentos', label: 'Fundamentos' },
  { to: '/algoritmos', label: 'Algoritmos' },
  { to: '/comparar', label: 'Comparar' },
  { to: '/tempos', label: 'Tabela de tempos' },
];

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink to="/" className={styles.brand}>
            <BrandMark />
            <span>
              Pesquisa <span className={styles.amp}>&amp;</span> Ordenação
            </span>
          </NavLink>
          <nav aria-label="Principal">
            <ul className={styles.nav}>
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="conteudo" className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>Desenvolvido por Mateus Petris.</p>
          <p>
            Feito para a aprendizagem dos algoritmos. Para estudar mais, veja a{' '}
            <a href="https://www.ime.usp.br/~slago/slago-ordena-busca.pdf" target="_blank" rel="noopener noreferrer">
              apostila de ordenação e busca do IME-USP
            </a>{' '}
            e a{' '}
            <a
              href="https://www.youtube.com/watch?v=GNmpB_ThHL0&list=PL4CetycR1mc9QsxjtD9YJyjx1Pv8-xBej"
              target="_blank"
              rel="noopener noreferrer"
            >
              Playlist em vídeo da professora Cinthia FAESA-ES
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

function BrandMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 28 28" aria-hidden="true">
      <rect x="3" y="15" width="5" height="10" rx="1" fill="var(--green)" />
      <rect x="11.5" y="9" width="5" height="16" rx="1" fill="var(--yellow)" />
      <rect x="20" y="3" width="5" height="22" rx="1" fill="var(--green-dark)" />
    </svg>
  );
}
