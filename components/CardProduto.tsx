import Image from "next/image";
import Link from "next/link";
import { rotuloDe } from "@/data/rotulos";
import { precoBRL } from "@/lib/formato";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão é uma etiqueta: a foto do frasco em 4:5 com fio fino, a linha
 * de rótulo, o nome e o número que importa (300 mg, 4 formas, 10.000 UI).
 */
export function CardProduto({
  produto,
  prioridade = false,
  tamanhos = "(max-width: 640px) 90vw, (max-width: 1024px) 46vw, 30vw",
}: {
  produto: Produto;
  categoria?: Categoria | null;
  prioridade?: boolean;
  tamanhos?: string;
}) {
  const capa = produto.imagens[0];
  const rotulo = rotuloDe(produto.slug);
  const vigente = precoBRL(produto.preco_promocional ?? produto.preco);
  const href = `/produto/${produto.slug}`;

  return (
    <article className="etiqueta-hover flex h-full flex-col">
      <Link href={href} className="etiqueta-foto" aria-label={produto.nome}>
        <span className="foto block aspect-[4/5]">
          {capa ? (
            <Image src={capa.url} alt={capa.alt ?? produto.nome} fill sizes={tamanhos} placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} priority={prioridade} className="object-cover" />
          ) : null}
        </span>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        {rotulo ? <p className="rotulo">{rotulo.linha}</p> : null}
        <h3 className="titulo-cartao mt-1.5 text-tinta">
          <Link href={href} className="transition-colors hover:text-ouro-escuro">
            {produto.nome}
          </Link>
        </h3>
        {rotulo ? (
          <p className="numero mt-3 flex items-baseline gap-1.5 text-tinta">
            <span className="text-[1.75rem]">{rotulo.numero.valor}</span>
            {rotulo.numero.unidade ? <span className="text-[1rem] text-ouro-escuro">{rotulo.numero.unidade}</span> : null}
            <span className="ml-1 text-[0.8125rem] font-normal text-tinta-fraca" style={{ fontFamily: "var(--font-corpo)", letterSpacing: 0 }}>
              {rotulo.numero.rotulo}
            </span>
          </p>
        ) : null}
        <p className="miudo mt-2">{vigente ?? "Preço na conversa"}</p>
      </div>
    </article>
  );
}
