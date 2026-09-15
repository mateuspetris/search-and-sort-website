import { Prism } from 'prism-react-renderer';

// O pacote não inclui Java; esta gramática cobre o subconjunto usado nos exemplos.
if (!Prism.languages.java) {
  Prism.languages.java = Prism.languages.extend('clike', {
    keyword:
      /\b(?:abstract|boolean|break|byte|case|catch|char|class|continue|default|do|double|else|enum|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|new|package|private|protected|public|return|short|static|super|switch|this|throw|throws|try|void|while)\b/,
    boolean: /\b(?:false|true|null)\b/,
    number: /\b\d+(?:\.\d+)?[dfl]?\b/i,
    'class-name': /\b[A-Z]\w*\b/,
    function: /\b\w+(?=\()/,
    operator: /[<>]=?|[!=]=?|&&|\|\||[-+*/%]=?|\+\+|--|[?:]/,
  });
}
