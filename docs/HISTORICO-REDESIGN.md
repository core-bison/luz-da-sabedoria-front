# Historico do redesign — setembro de 2026

Registro do trabalho de reestruturacao do frontend: o que foi feito, por que, onde ficou no codigo e o que ainda depende de backend ou de conteudo do cliente.

Para a referencia viva de rotas, componentes e tokens, use [APLICACAO.md](./APLICACAO.md). Este documento registra a mudanca; aquele descreve o estado atual.

## 1. Ponto de partida

Diagnostico feito sobre o prototipo original:

- **Tema invertido por forca bruta.** Componentes escritos para tema escuro (`bg-navy`, `text-cream`) eram convertidos para claro por ~80 linhas de `!important` em `globals.css`. As classes nao correspondiam ao que aparecia na tela e o contraste falhava em varios pontos.
- **Nenhuma fonte carregada.** `--font-sans` nao existia e `font-serif` caia no Times do navegador.
- **Animacao inexistente.** `animate-fade-in-up` era usada em 14 arquivos e nunca foi definida.
- **Portugues de Portugal** em ~27 textos ("Palavra-passe", "Contacto", "Guardar", "maconica").
- **Bugs:** `params` sincrono no Next 16 (`/painel/posts/[id]/editar` exibia "undefined"; o detalhe de noticia sempre retornava o mesmo post), diretiva invalida `"use path"` no perfil, 6 erros de lint, mensagem do WhatsApp sem `encodeURIComponent`, ancora `#veneravel` inexistente.
- **Sinais de "vibecode":** glows borrados em todos os heros, emojis como icones, `∴` no lugar do brasao, cantos arredondados e sombra em tudo, todas as paginas no mesmo molde.
- **Assets:** 20+ imagens reais sem uso, com espacos, acentos e `∴` nos nomes, ~30 MB no total.
- **Dependencias** declaradas como `latest`.

## 2. Direcao visual

Definida com o cliente interno: **base branca, navy do brasao como contraste, dourado apenas em detalhes**. Sem tema escuro.

| Decisao | Motivo |
| --- | --- |
| Tokens semanticos (`paper`, `navy`, `gold`, `gold-deep`, `body`, `muted`, `line`) | Classes passam a dizer o que aparece; overrides removidos. |
| `gold` nunca como texto sobre fundo claro | Contraste de 1,75:1. Texto dourado usa `gold-deep` (5,4:1). |
| Cormorant Garamond (titulos) + Inter (texto), via `next/font` | Tom institucional e legibilidade. |
| Cantos `rounded-sm`, sem sombras, filetes de 1–2px | Linguagem sobria e "arquitetonica". |
| Numerais romanos (I–IV) para enumerar | Dialoga com os graus. |
| Algarismos alinhados (`lining-nums`) em indicadores e datas | A Cormorant usa algarismos de estilo antigo por padrao. |
| Movimento discreto (`Reveal`, `animate-rise`) respeitando `prefers-reduced-motion` | Acabamento sem espetaculo. |

## 3. Fases executadas

### Fase 1 — Fundacao

- Versoes fixadas no `package.json` (Next 16.3.6, React 19.3.0, Tailwind 4.3.3, TypeScript 6.0.3) e `lucide-react` adicionado.
- Bugs da secao 1 corrigidos; lint zerado; texto revisado para PT-BR.
- Imagens renomeadas para `kebab-case`, redimensionadas e comprimidas (~30 MB → ~4,2 MB). Logo da Fraternidade recortado em circulo transparente (o original tinha fundo preto). Originais preservados em `../assets-originais` (fora do repositorio). Mapeamento em [IMAGENS.md](./IMAGENS.md).
- Favicon gerado do brasao (`src/app/icon.png`).

### Fase 2 — Design system

- `globals.css` reescrito: tokens, fontes, `container-page`, `prose-article`, keyframe `rise` e reducao de movimento. Todos os `!important` removidos.
- Componentes base em `src/components/ui`: `Button` (+ `buttonClasses`), `SectionHeader` (nivel de titulo configuravel), `PageHero`, `PageHeader`, `Brand`, `Card`, `Badge`, `Field`/`Input`/`Textarea`/`Select`, `Table`/`Th`/`Tr`/`Td`/`TableEmpty`, `Reveal`, `FileInput`.
- `cn()` centralizado em `src/lib/utils.ts`; `formatDate()` em `src/lib/format.ts`.
- Todas as telas migradas. Cada pagina tem um unico `h1` e `metadata` propria.
- Header branco com brasao real, pagina ativa e menu mobile acessivel. Footer navy.

### Fase 4 — Home

Abertura com foto da Loja (recorte 3:2 para esconder o monograma do piso do salao), faixa de credenciais (GOCE/COMAB), palavra do Veneravel em faixa navy, Rito com o estandarte, noticias recentes, galeria em mosaico e Fraternidade Feminina.

### Fase 5 — Paginas internas

- **Quem Somos:** brasao 3D na abertura, secao Obediencia, selo da Gestao 2026–2028 e diretoria com fotos e nomes reais.
- **O Rito:** tapete do altar ilustrando a origem; importancia filosofica em faixa navy.
- **Noticias:** publicacao em destaque (`PostFeatured`), "Leia tambem" no detalhe, botoes de compartilhar funcionais, enquadramento por imagem (`cover.position`).
- **Contato:** formulario isolado em componente client, numero do WhatsApp via `NEXT_PUBLIC_WHATSAPP_NUMBER`, secao "Como chegar" com Google Maps.
- **404** com a identidade do portal (`src/app/not-found.tsx`).

### Fase 6 — Area restrita e administracao

- Layout restrito como server component; interatividade isolada em `RestrictedSidebar`.
- Dashboard do membro: proximas sessoes, novidades da biblioteca do grau, avisos da Secretaria, atalhos.
- `/painel` virou visao geral com indicadores (`StatCards`) e pendencias.
- Busca e filtro reais nas tabelas via `?q=` e `?filtro=` (filtragem no servidor, sem distincao de acento e caixa).
- Sessao mock centralizada em `src/features/auth/data/mock-session.ts`.

### Review e ajustes pos-review

- **Controle de acesso por grau** na biblioteca (`src/features/biblioteca/access.ts`): o Irmao acessa o proprio grau e os anteriores. Abas e rotas respeitam a regra. Testado com usuario Aprendiz: nenhum documento de Mestre aparece no HTML.
- **Guarda do painel:** `src/app/(admin)/layout.tsx` redireciona quem nao e admin.
- **Gestao da biblioteca pelo admin:** `/painel/biblioteca`, `/novo` e `/[id]/editar`, com grau minimo, "material sensivel" e upload validado (PDF/DOC/DOCX/ZIP ate 20 MB).
- **Troca de senha** passou a exigir senha atual e confirmacao.
- `noindex` em toda a area restrita; fuso `America/Fortaleza` nos proximos eventos; skip link na area restrita; `priority` do brasao apenas acima da dobra.
- Esbocos sem uso removidos (`PermissionGate`, `SidebarAdmin`, `UploadZone`).
- **`Reveal` refeito so com CSS** (`animation-timeline: view()`). A versao com IntersectionObserver deixava secoes invisiveis enquanto o JavaScript nao carregava, o que apareceu em capturas com a maquina carregada e aconteceria em celulares lentos.

## 4. Onde trocar mocks por dados reais

| Dominio | Arquivo mock | Consumidores |
| --- | --- | --- |
| Sessao | `features/auth/data/mock-session.ts` | layouts restrito e admin, sidebar, dashboard, perfil, biblioteca |
| Noticias | `features/posts/data/mock-posts.ts` | Home, `/noticias`, detalhe, painel |
| Biblioteca | `features/biblioteca/data/mock-documents.ts` | biblioteca do membro, dashboard, painel |
| Eventos | `features/eventos/data/mock-events.ts` | dashboard, visao geral, calendario |
| Membros | `features/membros/data/mock-members.ts` | visao geral, gestao de membros |
| Avisos | `features/area-restrita/data/mock-avisos.ts` | dashboard |

Todos os pontos que dependem da sessao real estao marcados com `TODO`.

## 5. Pendencias tecnicas

Bloqueiam producao:

1. **Autenticacao real.** `src/proxy.ts` libera tudo e o login aceita qualquer credencial.
2. **Armazenamento privado para a biblioteca.** Os arquivos **nunca** podem ficar em `public/`. Usar storage privado com URLs temporarias emitidas apos verificar sessao e grau.
3. **Sanitizacao do HTML das noticias** no backend antes do `dangerouslySetInnerHTML`.
4. **Server Actions** para posts, documentos, membros e eventos (hoje as acoes exibem mensagem de simulacao).

Recomendadas:

- Modelo de **papeis** (`admin`, `secretaria`, `tesouraria`) no lugar de `isAdmin`, se os relatorios forem por papel.
- Confirmacao e feedback nas acoes das tabelas (excluir, alterar grau, cadastrar).
- "Salvar rascunho" nao deveria exigir capa.
- Testes de ponta a ponta (Playwright) para login, acesso por grau e filtros.
- SEO e performance (fase 7): `metadataBase`, sitemap, robots, Open Graph, dados estruturados e Lighthouse. Medir o impacto de `animate-rise` no LCP.

## 6. Pendencias de conteudo (cliente)

- Coordenacao da Fraternidade Feminina (4 nomes).
- Texto completo da mensagem do Veneravel Mestre.
- Numero institucional do WhatsApp.
- Confirmar os textos ilustrativos: noticias mock, avisos da Secretaria, descricoes do GOCE e da COMAB, titulo "Da Alemanha para Milagres".
- Confirmar a correspondencia foto × nome da diretoria.
- Identificar a terceira bandeira do estandarte (texto alternativo).
- Decidir escopo dos relatorios (tesouraria?) e quem os acessa.

## 7. Operacional

- **Nada foi commitado.** As mudancas estao no working tree da `main`, junto de alteracoes anteriores.
- **`public/` esta fora do git.** Sem commita-la, o deploy sobe sem imagens.
- Verificacao usada em cada fase: `npm run lint`, `npx tsc --noEmit`, `npm run build` e screenshots em desktop (1440px) e mobile.
