# Leonardo Salvador — Portfolio

Site estático do portfólio de Leonardo Salvador (Product Designer), migrado do Adobe Portfolio para hospedagem independente no GitHub Pages.

## Estrutura

```
├── index.html          # Galeria principal
├── about.html          # Sobre
├── work.html           # Redireciona para index.html
├── *.html              # Case studies (11 páginas)
├── assets/
│   ├── css/            # fonts.css, main.css, theme.css
│   ├── js/             # site.js
│   ├── images/         # Imagens do portfólio
│   └── fonts/          # Fontes self-hosted (Typekit)
├── .nojekyll           # Necessário para GitHub Pages
├── CNAME               # Domínio customizado (leonardosalvador.com)
├── sitemap.xml
└── robots.txt
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `seu-usuario.github.io` ou `portfolio`).
2. Envie **todo o conteúdo desta pasta** para a branch `main` (na raiz do repositório).
3. Em **Settings → Pages**, selecione:
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
4. Aguarde alguns minutos. O site ficará em `https://seu-usuario.github.io` ou no domínio do `CNAME`.

### Domínio customizado

O arquivo `CNAME` já contém `leonardosalvador.com`. No painel DNS do seu provedor, adicione:

| Tipo  | Nome | Valor                    |
|-------|------|--------------------------|
| CNAME | www  | `seu-usuario.github.io`  |
| A     | @    | IPs do GitHub Pages*     |

\* IPs atuais do GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

## Testar localmente

```bash
python3 -m http.server 8080
```

Abra http://localhost:8080

## Créditos

Design e conteúdo: Leonardo Salvador  
Site original exportado do Adobe Portfolio
