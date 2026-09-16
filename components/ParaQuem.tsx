import Link from "next/link";
import { OBJETIVOS, rotuloDe } from "@/data/rotulos";
import type { Produto } from "@/lib/tipos";

/**
 * Para quem: três portas por objetivo (cabelo, pele e unhas; sono, foco
 * e músculos; imunidade e ossos), cada uma apontando para o frasco que
 * responde. As frases são as da própria loja.
 */
export function ParaQuem({ produtos }: { produtos: Produto[] }) {
  const portas = Object.entries(OBJETIVOS)
    .map(([slug, o]) => ({ slug, ...o, produto: produtos.find((p) => rotuloDe(p.slug)?.objetivo === slug) }))
    .filter((o) => o.produto);

  return (
    <section aria-labelledby="titulo-para-quem" className="mx-auto max-w-[76rem] px-4 pt-14 sm:px-6 lg:px-10 lg:pt-20">
      <div className="regua">
        <div>
          <p className="rotulo">Para quem</p>
          <h2 id="titulo-para-quem" className="secao mt-1 text-tinta">
            Comece pelo que você quer cuidar
          </h2>
        </div>
      </div>
      <ul className="mt-2 divide-y divide-fio">
        {portas.map((o) => {
          const r = rotuloDe(o.produto!.slug)!;
          return (
            <li key={o.slug}>
              <Link href={`/produto/${o.produto!.slug}`} className="group grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:items-center sm:gap-6 lg:py-6">
                <span className="manchete text-[1.5rem] text-tinta transition-colors group-hover:text-ouro-escuro lg:text-[1.75rem]">{o.nome}</span>
                <span className="text-[0.9375rem] text-tinta-fraca">
                  {o.frase} <span className="text-tinta">{o.produto!.nome}</span>: {r.para.join(", ").toLowerCase()}.
                </span>
                <span className="btn btn--texto justify-self-start sm:justify-self-end">Ver o frasco</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
