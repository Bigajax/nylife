/* ============================================================
   RECORTAR FRASCOS: as artes do Instagram viram fotos de produto

   O feed da NYLIFE é feito de artes: o frasco aparece dentro de uma
   composição com título, texto e formas. A vitrine "rótulo" quer o
   frasco limpo, em 4:5, sobre o fundo da própria arte. Este script
   recorta a janela certa de cada arte (coordenadas na escala da ARTE
   ORIGINAL, convertidas pela largura real do webp exportado; quando o
   frasco não cabe em 4:5 sem pegar texto, estende a lateral espelhando
   o fundo ou com a cor da borda), escreve o
   webp de volta e atualiza largura, altura e blur no catálogo.

   Rodar DEPOIS de cada exportar-vitrine.ts. O original de cada foto é
   guardado em _fonte/produtos/ (gitignored) na primeira rodada, e as
   rodadas seguintes recortam sempre a partir dele: rodar duas vezes não
   recorta o recorte.

     node scripts/recortar-frascos.mjs
   ============================================================ */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const raiz = path.resolve(import.meta.dirname, "..");
const catalogoEm = path.join(raiz, "data", "catalogo.json");
const pastaFotos = path.join(raiz, "public", "produtos");
const pastaFonte = path.join(raiz, "_fonte", "produtos");
fs.mkdirSync(pastaFonte, { recursive: true });
const catalogo = JSON.parse(fs.readFileSync(catalogoEm, "utf8"));

/* janela de recorte por arquivo, em pixels da ARTE ORIGINAL (largura
   `de`); `esquerda`/`direita` estendem a lateral (modo "cor" para fundo
   chapado, "mirror" para fundo com textura) até fechar o 4:5 */
const JANELAS = {
  "magnesio-elementar-premium-500.webp": { de: 1080, left: 570, top: 320, width: 510, height: 740, direita: 82, modo: "mirror" },
  "magnesio-elementar-premium-500-2.webp": { de: 1280, left: 600, top: 560, width: 680, height: 850 },
  "nutricao-para-sua-beleza.webp": { de: 1440, left: 0, top: 330, width: 820, height: 1150, direita: 100, modo: "cor" },
  "nutricao-para-sua-beleza-2.webp": { de: 1440, left: 300, top: 700, width: 660, height: 825 },
  "vitamina-lipossomal-d3-k2-e-a.webp": { de: 1170, left: 0, top: 100, width: 1170, height: 1880, esquerda: 167, direita: 167, modo: "mirror" },
};

async function corDoCanto(buf, x, y) {
  const { data } = await sharp(buf).extract({ left: x, top: y, width: 8, height: 8 }).raw().toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < 64; i++) { r += data[i * 3]; g += data[i * 3 + 1]; b += data[i * 3 + 2]; }
  return { r: Math.round(r / 64), g: Math.round(g / 64), b: Math.round(b / 64) };
}

let feitas = 0;
for (const produto of catalogo.produtos) {
  for (const img of produto.imagens) {
    const nome = path.basename(img.url);
    const janela = JANELAS[nome];
    if (!janela) continue;
    const alvo = path.join(pastaFotos, nome);
    const fonte = path.join(pastaFonte, nome);
    if (!fs.existsSync(fonte)) fs.copyFileSync(alvo, fonte);

    const original = await sharp(fonte).metadata();
    const k = original.width / janela.de;
    const rec = { left: Math.round(janela.left * k), top: Math.round(janela.top * k), width: Math.round(janela.width * k), height: Math.round(janela.height * k) };
    rec.width = Math.min(rec.width, original.width - rec.left);
    rec.height = Math.min(rec.height, original.height - rec.top);

    let buf = await sharp(fonte).extract(rec).toBuffer();
    if (janela.esquerda || janela.direita) {
      /* fundo chapado: estende com a cor da borda; fundo com textura: espelha */
      const ext = { left: Math.round((janela.esquerda ?? 0) * k), right: Math.round((janela.direita ?? 0) * k) };
      if (janela.modo === "mirror") buf = await sharp(buf).extend({ ...ext, extendWith: "mirror" }).toBuffer();
      else buf = await sharp(buf).extend({ ...ext, background: await corDoCanto(buf, rec.width - 10, Math.round(rec.height / 2)) }).toBuffer();
    }
    buf = await sharp(buf).resize({ width: 960, height: 1200, fit: "cover" }).webp({ quality: 84 }).toBuffer();
    fs.writeFileSync(alvo, buf);
    img.largura = 960;
    img.altura = 1200;
    img.blur = `data:image/webp;base64,${(await sharp(buf).resize(12, 12, { fit: "inside" }).webp({ quality: 40 }).toBuffer()).toString("base64")}`;
    feitas++;
  }
}
/* a capa da categoria e o hero apontam para as mesmas fotos: blur novo */
for (const c of catalogo.categorias) {
  const dona = catalogo.produtos.flatMap((p) => p.imagens).find((i) => i.url === c.capa);
  if (dona) c.capaBlur = dona.blur;
}
for (const h of catalogo.hero) {
  const dona = catalogo.produtos.flatMap((p) => p.imagens).find((i) => i.url === h.url);
  if (dona) Object.assign(h, { largura: dona.largura, altura: dona.altura, blur: dona.blur });
}
fs.writeFileSync(catalogoEm, `${JSON.stringify(catalogo, null, 2)}\n`, "utf8");
console.log(`${feitas} frascos recortados.`);
