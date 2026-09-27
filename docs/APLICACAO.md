# Documentacao completa da aplicacao

## 1. Visao geral

O **Luz da Sabedoria** e um portal web da **A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18**, desenvolvido para apresentar a Loja ao publico, publicar noticias e eventos, oferecer uma area restrita para membros e organizar futuras rotinas administrativas.

A aplicacao esta em fase de prototipo funcional de interface. A estrutura de paginas, os layouts e os principais fluxos visuais estao montados, mas a maior parte dos dados ainda e mockada. Nao existe, no estado atual, banco de dados, sessao de usuario, envio real de e-mail, upload persistente ou autorizacao de acesso.

### Identidade institucional exibida

- Fundacao: 09 de marco de 2024.
- Localizacao: Oriente de Milagres, Ceara.
- Obediencia: Grande Oriente do Ceara (GOCE), federado a COMAB.
- Rito: Schroder.
- Lema exibido: "Luz que ilumina. Sabedoria que edifica. Fraternidade que une."

## 2. Tecnologias e configuracao

### Stack

- Next.js com App Router.
- React e React DOM.
- TypeScript em modo strict.
- Tailwind CSS v4 integrado via PostCSS.
- ESLint com configuracao do Next.js.
- Turbopack no servidor de desenvolvimento.
- `clsx` e `tailwind-merge` disponiveis para composicao de classes.

### Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

O desenvolvimento usa `http://localhost:3000` por padrao. O comando `npm run start` exige uma build anterior feita com `npm run build`.

### Configuracao TypeScript

- Alias de importacao: `@/*` aponta para `src/*`.
- `strict: true`.
- `noEmit: true`.
- Resolucao de modulos pelo bundler.
- Plugin do Next.js habilitado.

O arquivo `next.config.ts` ainda usa a configuracao padrao, sem integracoes externas ou regras especiais de imagem.

## 3. Arquitetura de pastas

```text
src/
├── app/
│   ├── api/                         # Route Handlers
│   ├── (public)/                    # Portal publico
│   ├── (auth)/                      # Login e recuperacao de acesso
│   ├── (membros)/                   # Area restrita de membros
│   ├── (admin)/                     # Rotas administrativas
│   ├── globals.css                  # Tokens e estilos globais
│   └── layout.tsx                   # Layout raiz e metadata
├── components/
│   └── ui/                          # Componentes genericos reutilizaveis
├── features/
│   ├── admin/                       # Componentes de administracao
│   ├── area-restrita/               # Sidebar da area restrita
│   ├── auth/                        # Componentes de autenticacao
│   ├── biblioteca/                  # Tipos, dados mock e componentes de documentos
│   ├── contato/                     # Formulario de contato
│   └── posts/                       # Tipos, dados mock, componentes e futuras actions
├── lib/                             # Utilitarios (cn, formatDate)
└── proxy.ts                         # Matcher das rotas privadas

docs/                                # Documentacao tecnica
public/
├── images/                          # Imagens publicas organizadas por dominio
└── docs/                            # Documentos publicos
```

### Criterio de organizacao

- `src/app`: decide URL, layout e composicao de pagina.
- `src/components`: componentes sem regra de dominio.
- `src/features`: componentes, tipos e actions ligados a um dominio.
- `public`: arquivos estaticos servidos diretamente pela raiz do site.
- `docs`: documentacao de arquitetura, imagens e aplicacao.

## 4. Layouts e composicao visual

### Layout raiz

`src/app/layout.tsx` define:

- idioma HTML `pt-BR`;
- fontes via `next/font`: Cormorant Garamond (titulos, `font-serif`) e Inter (texto, `font-sans`);
- metadata global com template de titulo `%s · Luz da Sabedoria`;
- favicon gerado do brasao em `src/app/icon.png`.

### Layout publico

`src/app/(public)/layout.tsx` monta link "Pular para o conteudo", `Header` sticky, `main#conteudo` e `Footer`.

O header e branco, usa o brasao real, marca a pagina atual (`aria-current` + filete dourado) e tem menu mobile acessivel (`aria-expanded`, `aria-controls`). O footer e a faixa navy do site.

### Layout de autenticacao

`src/app/(auth)/layout.tsx`: fundo `paper`, brasao, cartao branco com filete dourado no topo e link para voltar ao portal.

### Layout restrito

`src/app/(membros)/layout.tsx` (server component) tambem e reutilizado por `src/app/(admin)/layout.tsx`. A interatividade fica isolada em `RestrictedSidebar` (`src/features/area-restrita`), com navegacao de membros e de administracao, usuario mock `Membro Silva` e link de saida.

A exibicao dos links administrativos e visual. Nao ha verificacao real de role no layout.

## 5. Mapa completo de rotas

Os nomes entre parenteses sao grupos de rota do App Router e nao aparecem na URL.

### 5.1 Portal publico

| URL | Implementacao | Responsabilidade |
| --- | --- | --- |
| `/` | Conteudo real | Abertura com foto da Loja, credenciais (GOCE/COMAB), palavra do Veneravel (faixa navy), Rito, noticias recentes, galeria e Fraternidade. Blocos revelados ao rolar com `Reveal` (so CSS). |
| `/quem-somos` | Conteudo real | Brasao 3D, identificacao oficial, historia, principios (faixa navy), obediencia (GOCE/COMAB) e diretoria com fotos e selo da gestao. |
| `/rito-schroder` | Conteudo real | Origem com o tapete do rito, importancia filosofica (faixa navy) e quatro caracteristicas. |
| `/fraternidade` | Conteudo real | Identidade, essencia, galeria de acoes, coordenacao e contato. |
| `/noticias` | Mock | Publicacao mais recente em destaque (`PostFeatured`) e demais em grade. |
| `/noticias/[slug]` | Mock | Detalhe da publicacao; slug inexistente retorna 404. Botoes de compartilhar e bloco "Leia tambem". |
| `/contato` | Formulario local | Dados institucionais, formulario para WhatsApp e mapa (Google Maps embed). |

Todas as paginas publicas exportam `metadata` propria e possuem um unico `h1`.

#### Contato

O numero do WhatsApp vem de `NEXT_PUBLIC_WHATSAPP_NUMBER` (ver `.env.example`). Sem ele, o formulario exibe um aviso inline. A mensagem e codificada com `encodeURIComponent`.

### 5.2 Autenticacao

| URL | Implementacao | Comportamento atual |
| --- | --- | --- |
| `/login` | Interface mock | Aceita qualquer e-mail e senha preenchidos e redireciona para `/dashboard` depois de 1,2 segundos. |
| `/recuperar-senha` | Interface mock | Aceita qualquer e-mail valido e mostra confirmacao depois de 1,5 segundos. Nenhum e-mail e enviado. |

Nao existem cookies, tokens, sessoes, provedor de identidade ou validacao de credenciais.

### 5.3 Area de membros

| URL | Implementacao | Responsabilidade |
| --- | --- | --- |
| `/dashboard` | Mock (dinamica) | Saudacao com data e grau, proximas sessoes, novidades da biblioteca do grau, avisos da Secretaria e atalhos. |
| `/biblioteca` | Redirect | Redireciona para o grau do usuario. |
| `/biblioteca/[grau]` | Mock | `aprendiz`, `companheiro` ou `mestre`; grau acima do usuario mostra aviso de acesso restrito; valor invalido retorna 404. |
| `/perfil` | Interface local | Edita dados mockados e mostra confirmacao local de salvamento. |

**Regra de acesso** (`src/features/biblioteca/access.ts`): o Irmao acessa o proprio grau e os anteriores (Aprendiz → I; Companheiro → I e II; Mestre → I, II e III). As abas exibem apenas os graus acessiveis. A mesma regra precisa ser aplicada no servidor (rota, API e download) quando houver sessao real.

`src/app/(membros)/biblioteca/layout.tsx` concentra cabecalho e abas (`GrauTabs`). A pagina `[grau]` e o ponto onde a verificacao de grau devera ser aplicada. Os botoes de download ainda sao apenas visuais.

### 5.4 Administracao

| URL | Implementacao | Responsabilidade |
| --- | --- | --- |
| `/painel` | Mock (dinamica) | Visao geral: indicadores (`StatCards`), proximos eventos e pendencias. |
| `/painel/posts` | Mock | Tabela de publicacoes com busca, filtro, status e acoes. |
| `/painel/posts/novo` | Interface mock | `PostForm` vazio. |
| `/painel/posts/[id]/editar` | Interface mock | `PostForm` preenchido; id inexistente retorna 404. |
| `/painel/biblioteca` | Mock | Todos os documentos, com grau, arquivo, downloads, busca e filtro por grau. |
| `/painel/biblioteca/novo` | Interface mock | `DocumentForm`: titulo, descricao, grau minimo, material sensivel e arquivo (PDF/DOC/DOCX/ZIP ate 20 MB). |
| `/painel/biblioteca/[id]/editar` | Interface mock | `DocumentForm` preenchido; arquivo opcional (substituicao). |
| `/painel/membros` | Mock | Tabela de membros, graus, cargos e estado de acesso. |
| `/painel/eventos` | Mock | Calendario em tabela com tipo, data, local e status. |

`src/app/(admin)/layout.tsx` redireciona para `/dashboard` quem nao tem `isAdmin`. A area restrita inteira exporta `robots: noindex`.

Busca e filtro das tabelas funcionam: `TableToolbar` grava `?q=` e `?filtro=` na URL (com debounce) e a pagina filtra no servidor via `searchParams`, ignorando acentos e caixa (`src/lib/search.ts`). Criacao, edicao, exclusao, upload, alteracao de grau e agendamento ainda nao sao persistentes.

Paginas que dependem da data atual (`/dashboard`, `/painel`) chamam `await connection()` para renderizar a cada acesso.

### 5.5 Erros

`src/app/not-found.tsx` renderiza o 404 com header e footer do portal. E usado por URLs inexistentes e por `notFound()` (noticia, grau ou publicacao inexistente).

## 6. Componentes reutilizaveis

### UI geral (`src/components/ui`)

- `Button` / `buttonClasses`: variantes `primary`, `secondary`, `ghost`, `danger`, `gold` e `inverse` (as duas ultimas para fundo navy); tamanhos `sm`, `md`, `lg`; renderiza `Link` quando recebe `href`.
- `SectionHeader`: eyebrow, titulo e descricao; prop `as` define o nivel do titulo (`h1`, `h2`, `h3`), `size`, `align` e `tone` (`inverse` para fundo navy).
- `PageHero`: abertura padrao das paginas publicas internas (renderiza o `h1`).
- `PageHeader`: cabecalho das telas restritas, com link de voltar e slot de acoes (renderiza o `h1`).
- `Brand`: brasao + nome da Loja, usado em header, footer e sidebar.
- `Reveal`: revela o conteudo ao entrar na tela (fade + subida leve) usando apenas CSS (`animation-timeline: view()`). Nao depende de JavaScript; sem suporte do navegador ou com movimento reduzido, o conteudo aparece direto.
- `Card`, `Badge` (tons `neutral`, `navy`, `gold`, `success`, `warning`, `danger`).
- `Field`, `Label`, `Input`, `Textarea`, `Select`: formularios com estilo e espacamento unicos.
- `Table`, `Th`, `Tr`, `Td`, `TableEmpty`: tabelas administrativas e estado vazio.
- `FileInput`: upload com arrastar e soltar, validacao de extensao e tamanho no navegador e exibicao do arquivo escolhido.
- `Header` e `Footer` em `layout/`.

Icones: `lucide-react`. Nao usar emojis ou caracteres Unicode como icone.

### Componentes por dominio

- `posts`: `PostCard`, `PostList`, `PostForm` (criacao e edicao), `ShareButtons`.
- `biblioteca`: `DocumentCard`, `GrauTabs`, `DocumentForm` e a regra `canAccessGrau` / `getAccessibleGraus`.
- `contato`: `ContactForm`.
- `area-restrita`: `RestrictedSidebar`.
- `admin`: `TableToolbar` (busca/filtro via URL) e `StatCards`.
- `eventos`: `EventList` (lista compacta com bloco de data).
- `auth`: `LoginForm` e `PasswordRecoveryForm`.
- `area-restrita`: `RestrictedSidebar` e `ProfileForm` (troca de senha exige senha atual e confirmacao).

## 7. Dados, tipos e estado

### Dados mockados

Os mocks ficam centralizados por dominio, para que a troca por API aconteca em um unico lugar:

- `src/features/posts/data/mock-posts.ts`: `MOCK_POSTS`, `getPublishedPosts()`, `getPostBySlug()`, `getPostById()`.
- `src/features/biblioteca/data/mock-documents.ts`: `GRAUS` e `MOCK_DOCUMENTS`.
- `src/features/eventos/data/mock-events.ts`: `MOCK_EVENTS`, `EVENTO_TIPOS`, `getUpcomingEvents()`.
- `src/features/membros/data/mock-members.ts`: `MOCK_MEMBERS` (e-mails em `@exemplo.com`).
- `src/features/area-restrita/data/mock-avisos.ts`: `MOCK_AVISOS`.
- `src/features/auth/data/mock-session.ts`: `MOCK_SESSION_USER` (nome, grau, cargo, `isAdmin`). O layout restrito le o usuario daqui e repassa a `RestrictedSidebar`; o menu de administracao so aparece com `isAdmin`. Ponto unico a trocar pela sessao real.

Datas sao armazenadas em ISO (`AAAA-MM-DD`) e formatadas com `formatDate()` (`src/lib/format.ts`).

### Tipos

- `src/features/posts/types`: `IPost` (id, slug, titulo, resumo, conteudo, categoria, data, autor, status, views, capa).
- `src/features/biblioteca/types`: `Grau` e `BibliotecaDocument`.

### Estado local

O estado da interface e controlado com `useState` em login, recuperacao de senha, contato, perfil, menus mobile, compartilhamento e formulario de posts. Nao existe camada global de estado, cache de servidor ou sincronizacao com API.

### Server Actions

`src/features/posts/actions/index.ts` possui `createPost()` e `deletePost()`, mas ambas as funcoes lancam `Error("Not implemented")`.

## 8. APIs atuais

Existem tres Route Handlers:

| Metodo | Endpoint | Resposta atual |
| --- | --- | --- |
| `GET` | `/api/auth` | `{ "resource": "auth" }` |
| `GET` | `/api/posts` | `{ "resource": "posts" }` |
| `GET` | `/api/biblioteca` | `{ "resource": "biblioteca" }` |

Esses endpoints confirmam apenas a existencia dos recursos. Nao possuem:

- validacao de entrada;
- autenticacao;
- autorizacao;
- acesso a banco;
- paginacao;
- filtros reais;
- tratamento de erros de dominio;
- operacoes `POST`, `PATCH` ou `DELETE`.

## 9. Autenticacao, autorizacao e riscos atuais

`src/proxy.ts` possui matcher para:

- `/dashboard/:path*`;
- `/biblioteca/:path*`;
- `/perfil/:path*`;
- `/painel/:path*`.

Apesar disso, a funcao retorna `NextResponse.next()` para todas as requisicoes. Portanto, o matcher organiza o ponto de entrada, mas nao protege as rotas.

### Estado de seguranca conhecido

- Qualquer pessoa pode abrir diretamente as rotas privadas.
- Qualquer e-mail e senha preenchidos simulam login bem-sucedido.
- O `PermissionGate` nao restringe filhos.
- A area administrativa nao valida role.
- Documentos restritos nao possuem controle real de acesso.
- Nao ha protecao de API por sessao.
- O HTML de posts e atualmente controlado pelo proprio mock, mas exigira sanitizacao quando vier de usuarios.

## 10. Design system e acessibilidade visual

Direcao: **base branca, navy como contraste, dourado apenas em detalhes**. Sem tema escuro.

Os tokens ficam em `src/app/globals.css` (`@theme`):

| Token | Valor | Uso |
| --- | --- | --- |
| `white` / `paper` | `#ffffff` / `#f7f5f0` | Fundos; alternar secoes entre os dois. |
| `navy` / `navy-deep` | `#14284b` / `#0b1830` | Titulos, botao primario, faixas de contraste, footer. |
| `navy-50` | `#eef1f6` | Estados ativos e destaques suaves. |
| `gold` | `#e7c02a` | Filetes, marcadores, detalhes graficos e texto **sobre navy**. |
| `gold-deep` | `#7d6000` | Texto dourado sobre fundo claro (eyebrows, categorias). |
| `body` / `muted` | `#3d4657` / `#5f6878` | Texto corrido e secundario. |
| `line` / `line-strong` | `#e4e0d6` / `#cfc9bb` | Bordas e divisores. |
| `success` / `warning` / `danger` | `#1f7a4d` / `#9a5b07` / `#b42318` | Estados. |
| `fraternidade` | `#1d6b35` | Reservado a identidade da Fraternidade Feminina. |

Regras:

- `gold` nunca e texto sobre fundo claro (contraste 1,75:1). Use `gold-deep` (5,4:1).
- Cantos retos ou quase retos (`rounded-sm`); sem sombras decorativas nem glows.
- Uppercase com tracking apenas no eyebrow do `SectionHeader` e em cabecalhos de tabela.
- Cada pagina tem exatamente um `h1`.

Utilitarios: `container-page` (largura e respiro lateral), `animate-rise` (entrada suave) e `prose-article` (conteudo das noticias). `prefers-reduced-motion` desativa animacoes e transicoes.

## 11. Imagens e arquivos publicos

A organizacao detalhada esta em [IMAGENS.md](./IMAGENS.md). Todas as imagens ja estao em `public/images`, com nomes em `kebab-case` e otimizadas. Os originais ficam fora do projeto, em `../assets-originais`.

Imagens sempre via `next/image`, com `alt` descritivo (ou `alt=""` quando decorativas, como o brasao ao lado do nome da Loja).

## 12. Fluxos principais

### Visitante

1. Acessa `/`.
2. Navega pelas paginas institucionais.
3. Consulta noticias mockadas.
4. Abre uma publicacao por slug.
5. Preenche o formulario de contato.
6. Ao configurar o numero de WhatsApp, abre uma conversa externa com a mensagem formatada.

### Membro no prototipo

1. Acessa `/login`.
2. Preenche quaisquer credenciais validas no navegador.
3. E redirecionado para `/dashboard`.
4. Acessa biblioteca, perfil e links administrativos sem verificacao de sessao.
5. Altera dados de perfil somente no estado local.

### Administrador no prototipo

1. Acessa qualquer rota de painel diretamente.
2. Consulta tabelas mockadas.
3. Abre a interface de nova publicacao ou edicao.
4. Preenche campos, mas as acoes apenas simulam atraso e exibem alerta.

## 13. O que esta pronto e o que falta

### Pronto no frontend

- Estrutura Next.js e App Router.
- Layout raiz e layouts por contexto.
- Navegacao publica e responsiva.
- Paginas institucionais com conteudo.
- Area visual de autenticacao.
- Biblioteca separada por grau.
- Perfil com formulario local.
- Telas administrativas de posts, membros e eventos.
- Componentes reutilizaveis basicos.
- Tokens visuais e estilos globais.
- Route Handlers iniciais.

### Ainda nao implementado

- Banco de dados e migrations.
- Cadastro, login e logout reais.
- Recuperacao e redefinicao de senha por e-mail.
- Cookies, sessoes ou tokens.
- Autorizacao por role e grau.
- CRUD persistente de posts, membros e eventos.
- Upload e armazenamento de imagens/documentos.
- Download protegido da biblioteca.
- Busca, filtros e paginacao reais.
- Editor rich text real.
- Testes automatizados.
- Observabilidade, logs e tratamento centralizado de erros.
- Configuracao de `NEXT_PUBLIC_WHATSAPP_NUMBER` em producao.

## 14. Roadmap tecnico recomendado

### Fase 1: fundacao de dados

1. Escolher banco SQL e camada de acesso.
2. Criar entidades para usuarios, membros, posts, eventos e documentos.
3. Substituir mocks por consultas server-side.
4. Definir estados, categorias, graus e roles como tipos compartilhados.

### Fase 2: autenticacao e autorizacao

1. Adotar uma solucao de sessao compativel com Next.js.
2. Implementar login, logout e recuperacao de senha.
3. Proteger o `proxy` e as APIs.
4. Implementar verificacao por role administrativa.
5. Implementar verificacao de grau para a biblioteca.

### Fase 3: operacao administrativa

1. Implementar CRUD de posts e eventos.
2. Trocar o editor simulado por um editor rico com sanitizacao.
3. Implementar filtros e paginacao.
4. Implementar gestao de membros e aprovacao de acesso.
5. Adicionar upload e processamento de capas.

### Fase 4: biblioteca e conteudo publico

1. Armazenar documentos com metadados.
2. Proteger downloads por sessao e grau.
3. Ativar imagens reais de noticias, diretoria e galeria.
4. Criar estados vazios, carregamento e erro.
5. Configurar o WhatsApp ou uma API de contato.

### Fase 5: qualidade e entrega

1. Adicionar testes unitarios e de integracao.
2. Adicionar testes de navegacao dos fluxos criticos.
3. Executar auditoria de acessibilidade.
4. Validar SEO, metadata e imagens.
5. Configurar ambiente de producao, variaveis e monitoramento.

## 15. Documentos relacionados

- [Arquitetura atual](./ARQUITETURA.md): resumo da estrutura tecnica original.
- [Arquitetura de imagens](./IMAGENS.md): convencoes e mapeamento dos assets.
- [README do projeto](../README.md): comandos e porta de entrada do repositorio.
