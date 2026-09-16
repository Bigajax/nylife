import Link from "next/link";
import { rotuloDe } from "@/data/rotulos";
import type { Produto } from "@/lib/tipos";

/**
 * A abertura é uma tabela: a manchete da loja e, embaixo, uma linha por
 * produto com o número do rótulo (300 mg, 4 formas, 10.000 UI) em
 * Fraunces grande. Sem foto no hero: os frascos aparecem logo abaixo,
 * no rótulo aberto. O único movimento da página é a régua se traçando.
 */
export function Hero({ produtos, fraseHero }: { produtos: Produto[]; fraseHero: string }) {
  const linhas = produtos
    .map((p) => ({ p, r: rotuloDe(p.slug) }))
    .filter((x): x is { p: Produto; r: NonNullable<ReturnType<typeof rotuloDe>> } => Boolean(x.r));

  return (
    <section className="mx-auto max-w-[76rem] px-4 pb-6 pt-10 sm:px-6 lg:px-10 lg:pb-10 lg:pt-16">
      <p className="rotulo">Suplemento alimentar</p>
      <h1 className="manchete mt-3 max-w-[16ch] text-[clamp(2.5rem,6.2vw,4.75rem)] text-tinta">{fraseHero}</h1>
      <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-tinta-fraca">
        Fórmulas premium, com o que está escrito no rótulo. Três produtos, um pedido pelo WhatsApp.
      </p>

      <div className="fio-rotulo traca mt-10" />
      <ol className="divide-y divide-fio">
        {linhas.map(({ p, r }) => (
          <li key={p.id}>
            <Link href={`/produto/${p.slug}`} className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] sm:items-center lg:py-6">
              <span className="min-w-0">
                <span className="titulo-cartao block text-tinta transition-colors group-hover:text-ouro-escuro">{p.nome}</span>
                <span className="miudo mt-0.5 block">{r.embalagem}, {r.dose.split(";")[0]}</span>
              </span>
              <span className="numero col-span-2 flex items-baseline gap-2 text-tinta sm:col-span-1">
                <span className="text-[clamp(2.25rem,5vw,3.75rem)]">{r.numero.valor}</span>
                {r.numero.unidade ? <span className="text-[clamp(1.125rem,2vw,1.5rem)] text-ouro-escuro">{r.numero.unidade}</span> : null}
                <span className="font-corpo ml-1 text-[0.8125rem] font-normal tracking-normal text-tinta-fraca" style={{ fontFamily: "var(--font-corpo)", letterSpacing: 0 }}>
                  {r.numero.rotulo}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="fio-rotulo" />
    </section>
  );
}
