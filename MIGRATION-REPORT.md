# Relatório de Correções — Remoção Adobe Portfolio Runtime

**Data:** 2026-06-07

## Problema identificado

A tela ficava em branco porque:

1. **Paths absolutos** (`/assets/...`, `/index.html`) quebram em GitHub Pages de projeto (`usuario.github.io/repo/`) e em abertura local fora da raiz do domínio.
2. **Resquícios do Adobe Portfolio** (`dist/js/main.js`, `site/translations`) ainda existiam no repositório e podiam ser referenciados por versões antigas dos HTML.
3. **`ERR_CERT_COMMON_NAME_INVALID`** ocorre ao acessar `https://leonardosalvador.com` com certificado/domínio desalinhado — não é um bug do HTML migrado.

## Alterações realizadas

### 1. HTML (14 arquivos)

| Alteração | Arquivos |
|-----------|----------|
| `/assets/...` → `assets/...` (href, src, srcset, data-src, og:image) | 14 HTML |
| `/index.html`, `/about.html`, `/case-study.html` → paths relativos | 14 HTML |
| Removido `<link rel="canonical" href="https://leonardosalvador.com/...">` | 13 HTML |
| `work.html` redirect: `/index.html` → `index.html` | work.html |
| Back-to-top links corrigidos em `index.html` | index.html |

**Scripts carregados após correção (todos relativos):**
```
assets/js/site.js   ← único JS em todas as páginas
```

**Removido de todos os HTML (já ausente, reforçado no script):**
- `site/translations?cb=...`
- `dist/js/main.js?cb=...`
- `var __config__ = {...}`
- `use.typekit.net/...`
- `dist/css/main.css`

### 2. CSS / JS

| Arquivo | Alteração |
|---------|-----------|
| `assets/css/fonts.css` | Comentário sem referência Typekit/Adobe |
| `assets/css/theme.css` | Comentário de cabeçalho limpo |
| `assets/css/main.css` | Comentários atualizados |
| `assets/js/site.js` | Comentários atualizados; mantém nav, lightbox, grid--ready |

### 3. Arquivos de configuração

| Arquivo | Alteração |
|---------|-----------|
| `robots.txt` | Removida linha `Sitemap: https://leonardosalvador.com/...` |
| `sitemap.xml` | URLs relativas (`index.html`, `about.html`, ...) |
| `CNAME` | **Removido** (evita conflito com GitHub Pages sem domínio customizado) |

### 4. Diretórios legados removidos

- `dist/` (continha `main.js?cb=...`)
- `site/` (continha `translations?cb=...`)
- `cdn.myportfolio.com/`

### 5. Script criado

- `scripts/fix-paths.py` — reaplicável para converter paths e remover runtime Adobe

## Validação final

Escopo: `*.html`, `assets/**`, `robots.txt`, `sitemap.xml`

| Padrão | Resultado |
|--------|-----------|
| `leonardosalvador.com` | ✅ 0 ocorrências |
| `myportfolio.com` | ✅ 0 ocorrências |
| `adobe` | ✅ 0 ocorrências |
| `typekit` | ✅ 0 ocorrências |
| `main.js` | ✅ 0 ocorrências |
| `site/translations` | ✅ 0 ocorrências |
| Paths absolutos `/assets/` ou `/pagina.html` | ✅ 0 ocorrências |

## Como publicar no GitHub

1. Envie **todo o conteúdo** (HTML + `assets/` + `.nojekyll`) para a branch `main`.
2. **Settings → Pages →** branch `main`, pasta `/ (root)`.
3. Teste localmente antes: `python3 -m http.server 8080` → http://localhost:8080

## Nota sobre domínio customizado

Para usar `leonardosalvador.com` no futuro, recrie o arquivo `CNAME` com o domínio e configure DNS apontando para GitHub Pages. Isso é configuração de deploy, não dependência de runtime.
