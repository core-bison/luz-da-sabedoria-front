# Arquitetura de imagens

Os assets publicos do site ficam em `public/images/`. Nomes sempre minusculos, descritivos, em `kebab-case`, sem acentos, espacos ou simbolos (`∴`, `º`).

## Estrutura atual

```text
public/images/
├── logos/
│   ├── brasao-l18.png                 # brasao oficial (transparente) — header, footer, favicon
│   ├── brasao-3d.jpg
│   ├── selo-gestao-2026-2028.png
│   ├── goce.png
│   └── comab.png
├── simbolos/
│   ├── estandarte-pavilhao-nacional.jpg
│   └── tapete-altar.png
├── diretoria/
│   ├── veneravel-mestre.jpg
│   ├── primeiro-vigilante.jpg
│   ├── segundo-vigilante.jpg
│   ├── secretario.jpg
│   └── tesoureiro.jpg
├── eventos/
│   ├── aniversario-da-loja.jpg
│   ├── aniversario-01.jpg
│   ├── aniversario-02.jpg
│   ├── confraternizacao-01.jpg
│   ├── confraternizacao-02.jpg
│   ├── dia-das-criancas-01.jpg
│   └── dia-das-criancas-02.jpg
├── fraternidade-feminina/
│   ├── foto-fraternidade.jpg
│   └── logo-fraternidade-feminina.png  # recortado em circulo, fundo transparente
└── reuniao/
    ├── reuniao-01.jpg                 # arte de rede social com texto embutido — usar so em galeria
    └── reuniao-02.jpg
```

## Padrao de otimizacao

- Fotos: JPEG qualidade 82, lado maior ate 2000px (retratos da diretoria ate 900px).
- Logos com transparencia: PNG com paleta, ate 800px.
- O `next/image` gera WebP/AVIF e os tamanhos responsivos na entrega; os arquivos em `public/` sao apenas a fonte.
- Os originais sem tratamento ficam em `../assets-originais` (fora do repositorio).

## Uso

```tsx
import Image from "next/image";

<Image src="/images/diretoria/veneravel-mestre.jpg" alt="Venerável Mestre, José Roberto dos Santos Ribeiro" fill sizes="20vw" />
```

Documentos (PDF etc.) ficam em `public/docs/`.
