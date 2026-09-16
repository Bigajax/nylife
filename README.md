# NYLIFE Nutrition, vitrine digital

Site público + painel da loja para a **NYLIFE Nutrition** (@nylife_nutrition):
suplementos com fórmulas premium. Três produtos: Nutrição para sua Beleza (300 mg
de Keranat), Magnésio Elementar Premium 500 (quatro formas de magnésio) e
Vitamina Lipossomal D3, K2 e A. A conversão é pelo WhatsApp: não existe carrinho,
checkout nem login de cliente.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (opcional)
- **Catálogo:** 3 peças lidas das artes do Instagram pela oficina do estúdio
  (`scripts/exportar-vitrine.ts` no repositório rafael-razeira-estudio). Os
  frascos são recortados das artes por `scripts/recortar-frascos.mjs` (rodar
  depois de cada export). O que está escrito em cada rótulo mora em
  `data/rotulos.ts`: composição, dose, embalagem e as frases das legendas.
  Sem preço em lugar nenhum.
- **Base:** duplicada da vitrine da Aurum Sagrado (que veio da SacraZen). A
  lógica (dados, painel) é a mesma; identidade, textos, dados e todos os
  componentes visíveis são desta loja.

## Modo prévia

Enquanto a vitrine é uma amostra, `PREVIA` em `data/site.config.ts` faz TODO
botão de WhatsApp apontar para o estúdio, com uma mensagem só. Quando a loja
contratar: `PREVIA = null`, e o número da loja (já no mesmo arquivo) passa a valer.

## Como rodar

```bash
npm install
npx next dev -p 3080
```

Sem as chaves do Supabase o projeto roda em modo local: lê `data/catalogo.json`
e serve as fotos de `public/produtos`. É o modo da prévia. A senha do painel
nesse modo é `PAINEL_SENHA_LOCAL` (padrão: `nylife`).

## A identidade, em uma linha

"O rótulo": o site é a etiqueta do frasco. Branco de etiqueta, fios de tabela
nutricional (um grosso, um fino: `.fio-rotulo`), o ouro da marca só no nome e
nas linhas, o preto da tampa no botão. Fraunces nos nomes e nos números grandes
(300 mg, 4 formas, 10.000 UI), Figtree no corpo. A tabela de composição
(`components/Composicao.tsx`) é a peça central; o "rótulo aberto" da home
(`components/RotuloAberto.tsx`) é a prateleira e a ficha numa peça só. A marca é a logo real
do avatar do Instagram, em PNG com alfa usado como máscara (`components/Marca.tsx`,
`public/marca/logo.png` e `simbolo.png`); o favicon é o símbolo e a imagem de
compartilhamento (`public/og/site.jpg`) leva a logo inteira.

## Capturas

```bash
npm i --no-save puppeteer-core
node scripts/capturar.mjs http://localhost:3080/ saida.png 390 844 full
```
