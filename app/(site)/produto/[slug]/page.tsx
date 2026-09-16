import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardProduto } from "@/components/CardProduto";
import { Composicao } from "@/components/Composicao";
import { CompraProduto } from "@/components/CompraProduto";
import { GaleriaProduto } from "@/components/GaleriaProduto";
import { OBJETIVOS, rotuloDe } from "@/data/rotulos";
import { carregarCatalogo, obterConfig, obterProduto } from "@/lib/dados";
import { site } from "@/data/site.config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { produtos } = await carregarCatalogo();
  return produtos.filter((p) => p.ativo).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = await obterProduto(slug);
  if (!produto) return {};
  const descricao = produto.descricao ?? `${produto.nome}, NYLIFE Nutrition.`;
  return {
    title: produto.nome,
    description: descricao,
    alternates: { canonical: `/produto/${produto.slug}` },
    openGraph: {
      type: "website",
      title: `${produto.nome} · NYLIFE Nutrition`,
      description: descricao,
      url: `/produto/${produto.slug}`,
      images: produto.imagens[0] ? [{ url: produto.imagens[0].url, alt: produto.nome }] : [],
    },
  };
}

export default async function PaginaProduto({ params }: Props) {
  const { slug } = await params;
  const [produto, { produtos }, config] = await Promise.all([obterProduto(slug), carregarCatalogo(), obterConfig()]);
  if (!produto) notFound();

  const rotulo = rotuloDe(produto.slug);
  const objetivo = rotulo ? OBJETIVOS[rotulo.objetivo] : null;
  const outros = produtos.filter((p) => p.ativo && p.id !== produto.id).slice(0, 2);
  const preco = produto.preco_promocional ?? produto.preco;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    sku: produto.codigo,
    brand: { "@type": "Brand", name: "NYLIFE Nutrition" },
    ...(produto.descricao ? { description: produto.descricao } : {}),
    image: produto.imagens.map((i) => `${site.url}${i.url}`),
    offers: {
      "@type": "Offer",
      url: `${site.url}/produto/${produto.slug}`,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      ...(preco ? { price: preco } : {}),
      seller: { "@type": "Store", name: "NYLIFE Nutrition" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[76rem] px-4 pb-20 pt-6 sm:px-6 lg:px-10 lg:pt-10">
        <nav aria-label="Você está em" className="miudo mb-6">
          <Link href="/catalogo" className="hover:text-tinta">
            Os produtos
          </Link>
          {objetivo ? (
            <>
              <span className="px-2">/</span>
              <span>{objetivo.nome}</span>
            </>
          ) : null}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <GaleriaProduto imagens={produto.imagens} nome={produto.nome} />

          <div>
            {rotulo ? <p className="rotulo">{rotulo.linha}</p> : null}
            <h1 className="manchete mt-2 text-[clamp(1.875rem,3.6vw,2.875rem)] text-tinta">{produto.nome}</h1>
            {rotulo ? (
              <p className="numero mt-5 flex items-baseline gap-2 text-tinta">
                <span className="text-[clamp(2.5rem,5vw,3.75rem)]">{rotulo.numero.valor}</span>
                {rotulo.numero.unidade ? <span className="text-[1.5rem] text-ouro-escuro">{rotulo.numero.unidade}</span> : null}
                <span className="ml-1 text-[0.875rem] font-normal text-tinta-fraca" style={{ fontFamily: "var(--font-corpo)", letterSpacing: 0 }}>
                  {rotulo.numero.rotulo}
                </span>
              </p>
            ) : null}
            {rotulo ? <p className="falada mt-4 max-w-[42ch] text-tinta-fraca">{rotulo.frase}</p> : null}
            {produto.descricao ? <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-tinta">{produto.descricao}</p> : null}

            {rotulo ? (
              <>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {rotulo.para.map((t) => (
                    <li key={t} className="chip cursor-default">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Composicao rotulo={rotulo} />
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-3">
                  <div>
                    <dt className="text-tinta-fraca">Embalagem</dt>
                    <dd className="text-tinta">{rotulo.embalagem}</dd>
                  </div>
                  <div>
                    <dt className="text-tinta-fraca">Como tomar</dt>
                    <dd className="text-tinta">{rotulo.dose}</dd>
                  </div>
                  <div>
                    <dt className="text-tinta-fraca">Forma</dt>
                    <dd className="text-tinta">{rotulo.forma}</dd>
                  </div>
                </dl>
              </>
            ) : null}

            <div className="mt-8">
              <CompraProduto produto={produto} whatsapp={config.whatsapp} base={site.url} />
            </div>
          </div>
        </div>

        {outros.length ? (
          <section aria-labelledby="titulo-outros" className="mt-16 lg:mt-20">
            <div className="regua">
              <div>
                <p className="rotulo">Os outros frascos</p>
                <h2 id="titulo-outros" className="secao mt-1 text-tinta">
                  Combina com
                </h2>
              </div>
              <Link href="/catalogo" className="btn btn--texto shrink-0">
                Todos
              </Link>
            </div>
            <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {outros.map((p) => (
                <CardProduto key={p.id} produto={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
