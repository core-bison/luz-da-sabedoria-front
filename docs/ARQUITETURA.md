# Arquitetura atual

> Resumo da estrutura original. Para rotas, componentes e design system atualizados, consulte [APLICACAO.md](./APLICACAO.md).

## Visao geral

O projeto usa Next.js com TypeScript e App Router dentro de `src/`. A organizacao separa:

- rotas e layouts em `src/app`;
- componentes genericos em `src/components`;
- regras e componentes por dominio em `src/features`;
- controle de entrada para areas privadas em `src/proxy.ts`.

A base ja esta preparada para evoluir para autenticacao, persistencia SQL e um painel administrativo. Neste momento, as telas e endpoints sao estruturas iniciais, sem regra de negocio completa.

## Arvore principal

```text
src/
├── app/
│   ├── api/
│   │   ├── auth/route.ts
│   │   ├── posts/route.ts
│   │   └── biblioteca/route.ts
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── quem-somos/page.tsx
│   │   ├── rito-schroder/page.tsx
│   │   ├── fraternidade/page.tsx
│   │   ├── noticias/page.tsx
│   │   ├── noticias/[slug]/page.tsx
│   │   └── contato/page.tsx
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── recuperar-senha/page.tsx
│   ├── (membros)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── biblioteca/
│   │   │   ├── aprendiz/page.tsx
│   │   │   ├── companheiro/page.tsx
│   │   │   └── mestre/page.tsx
│   │   └── perfil/page.tsx
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   └── painel/
│   │       ├── page.tsx
│   │       ├── posts/novo/page.tsx
│   │       ├── posts/[id]/editar/page.tsx
│   │       ├── membros/page.tsx
│   │       └── eventos/page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   └── ui/
│       ├── layout/
│       │   ├── header.tsx
│       │   └── footer.tsx
│       └── page-placeholder.tsx
├── features/
│   ├── posts/
│   │   ├── actions/index.ts
│   │   ├── components/
│   │   │   ├── post-card.tsx
│   │   │   └── post-list.tsx
│   │   └── types/index.ts
│   ├── auth/components/
│   │   ├── login-form.tsx
│   │   └── permission-gate.tsx
│   ├── biblioteca/components/
│   │   ├── document-card.tsx
│   │   └── upload-zone.tsx
│   └── admin/components/
│       ├── sidebar-admin.tsx
│       └── stat-cards.tsx
└── proxy.ts
```

## Roteamento

Os nomes entre parenteses sao grupos de rota do App Router. Eles organizam layouts sem aparecerem na URL final.

### Area publica

O grupo `(public)` concentra as paginas abertas do portal e sera o local do header e footer publicos.

- `/`
- `/quem-somos`
- `/rito-schroder`
- `/fraternidade`
- `/noticias`
- `/noticias/[slug]`
- `/contato`

### Autenticacao

O grupo `(auth)` possui um layout separado para telas de entrada e recuperacao de acesso.

- `/login`
- `/recuperar-senha`

### Area de membros

O grupo `(membros)` representa o espaco autenticado do usuario.

- `/dashboard`
- `/biblioteca/aprendiz`
- `/biblioteca/companheiro`
- `/biblioteca/mestre`
- `/perfil`

As tres rotas da biblioteca por grau ja estao separadas para que a autorizacao possa ser aplicada de forma especifica no futuro.

### Administracao

O grupo `(admin)` concentra o painel destinado a usuarios com permissao administrativa.

- `/painel`
- `/painel/posts/novo`
- `/painel/posts/[id]/editar`
- `/painel/membros`
- `/painel/eventos`

## APIs

As rotas de API ficam em `src/app/api`, seguindo o convencao de Route Handlers do Next.js:

- `GET /api/auth`
- `GET /api/posts`
- `GET /api/biblioteca`

Atualmente elas retornam apenas um JSON identificando o recurso. A camada de acesso SQL ainda sera adicionada.

## Middleware e seguranca

`src/proxy.ts` ja possui um matcher para:

- `/dashboard/:path*`;
- `/biblioteca/:path*`;
- `/perfil/:path*`;
- `/painel/:path*`.

Por enquanto, o proxy usa `NextResponse.next()` e nao valida token ou role. O proximo passo e conectar a leitura do token de sessao, redirecionar usuarios nao autenticados para `/login` e restringir `/painel` a roles administrativas.

## Organizacao por features

Cada dominio possui seu proprio espaco em `src/features`:

- `posts`: tipo `IPost`, lista, card e a futura camada de Server Actions;
- `auth`: formulario de login e componente de permissao;
- `biblioteca`: documentos e upload;
- `admin`: componentes do painel e indicadores.

A pasta `src/components/ui` fica reservada a componentes genericos e reutilizaveis, sem regra de negocio.

## Estado atual e proximos passos

Ja implementado:

- configuracao inicial Next.js, TypeScript, ESLint e Tailwind;
- App Router com layouts por grupo;
- rotas publicas, de autenticacao, membros e administracao;
- endpoints iniciais de API;
- separacao de componentes genericos e features;
- proxy com os caminhos privados mapeados;
- `.gitignore` para dependencias, builds, ambientes e arquivos locais.

Ainda pendente:

- header, footer, sidebar e telas visuais definitivas;
- autenticacao e autorizacao reais;
- persistencia SQL e camada de acesso a dados;
- implementacao das Server Actions de posts;
- upload e controle de acesso aos documentos;
- testes automatizados e dados de desenvolvimento;
- validacao de grau maconico e role administrativo.

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run build
```

O servidor de desenvolvimento fica disponivel em `http://localhost:3000` por padrao.
