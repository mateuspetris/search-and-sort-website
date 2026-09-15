import { useEffect, useRef, useState } from 'react';
import { Highlight, type PrismTheme } from 'prism-react-renderer';
import './prismJava';
import styles from './CodeBlock.module.css';

const theme: PrismTheme = {
  plain: { color: '#1f2d27', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment'], style: { color: '#7c8a83', fontStyle: 'italic' } },
    { types: ['keyword', 'boolean'], style: { color: '#315c4a', fontWeight: '500' } },
    { types: ['class-name'], style: { color: '#24473a' } },
    { types: ['function'], style: { color: '#8a6a1f' } },
    { types: ['number', 'string'], style: { color: '#9b5b2e' } },
    { types: ['operator', 'punctuation'], style: { color: '#52615a' } },
  ],
};

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'java', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className={styles.block}>
      <figcaption className={styles.toolbar}>
        <span className={styles.title}>{title ?? language}</span>
        <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </figcaption>
      <Highlight code={code.trim()} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.pre}`} style={style}>
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })} className={styles.line}>
                <span className={styles.lineNumber} aria-hidden="true">
                  {lineIndex + 1}
                </span>
                <span>
                  {line.map((token, tokenIndex) => (
                    <span key={tokenIndex} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </figure>
  );
}
