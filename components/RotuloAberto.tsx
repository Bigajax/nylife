"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Composicao } from "./Composicao";
import { nomeCurto } from "./Cabecalho";
import { rotuloDe } from "@/data/rotulos";
import { linkPeca } from "@/lib/whatsapp";
import type { Produto } from "@/lib/tipos";

/**
 * O rótulo aberto: as três abas são os três frascos. Escolhe um e a
 * etiqueta se desdobra: a foto do frasco à esquerda, a linha de rótulo,
 * o nome, para quem é, a tabela de composição e o botão de pedir. É a
 * prateleira e a ficha, numa peça só.
 */
export function RotuloAberto({ produtos, whatsapp, base }: { produtos: Produto[]; whatsapp: string; base: string }) {
  const lista = produtos.filter((p) => rotuloDe(p.slug));
  const [atual, setAtual] = useState(0);
  const produto = lista[atual] ?? lista[0];
  if (!produto) return null;
  const rotulo = rotuloDe(produto.slug)!;
  const foto = produto.imagens[0];

  return (
    <section aria-labelledby="titulo-rotulo" className="mx-auto max-w-[76rem] px-4 pt-14 sm:px-6 lg:px-10 lg:pt-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="rotulo">O rótulo aberto</p>
          <h2 id="titulo-rotulo" className="secao mt-1 text-tinta">
            O que está em cada frasco
          </h2>
        </div>
        <div role="tablist" aria-label="Produto" className="flex gap-2">
          {lista.map((p, i) => (
            <button key={p.id} role="tab" type="button" aria-selected={i === atual} onClick={() => setAtual(i)} className="chip chip--quadrado">
              {nomeCurto(p.nome)}
            </button>
          ))}
        </div>
      </div>

      <div key={produto.id} className="mt-6 grid gap-8 border border-fio bg-white p-4 sm:p-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:p-8">
        <Link href={`/produto/${produto.slug}`} className="etiqueta-foto" aria-label={produto.nome}>
          <span className="foto block aspect-[4/5]">
            {foto ? <Image src={foto.url} alt={produto.nome} fill sizes="(max-width: 1024px) 90vw, 32rem" placeholder={foto.blur ? "blur" : "empty"} blurDataURL={foto.blur ?? undefined} className="object-cover" /> : null}
          </span>
        </Link>

        <div className="flex flex-col">
          <p className="rotulo">{rotulo.linha}</p>
          <h3 className="manchete mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] text-tinta">{produto.nome}</h3>
          <p className="falada mt-3 max-w-[40ch] text-tinta-fraca">{rotulo.frase}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {rotulo.para.map((t) => (
              <li key={t} className="chip cursor-default">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Composicao rotulo={rotulo} compacta />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-[0.875rem] sm:grid-cols-3">
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

          <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
            <a href={linkPeca(produto, { whatsapp, base, preco: null })} target="_blank" rel="noreferrer" className="btn btn--tampa">
              Pedir pelo WhatsApp
            </a>
            <Link href={`/produto/${produto.slug}`} className="btn btn--texto">
              Ver a ficha completa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
