import { CardProduto } from "./CardProduto";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * A prateleira inteira: três frascos, três etiquetas. Sem filtro, sem
 * busca: a loja cabe numa linha.
 */
export function Catalogo({ produtos, linkWhats }: { produtos: Produto[]; categorias?: Categoria[]; categoriaAtual?: string; buscaInicial?: string; linkWhats: string }) {
  return (
    <div className="mx-auto max-w-[76rem] px-4 pb-20 sm:px-6 lg:px-10">
      {produtos.length ? (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((p, i) => (
            <CardProduto key={p.id} produto={p} prioridade={i < 3} />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-md border border-fio bg-white p-10 text-center">
          <p className="titulo-cartao text-tinta">Nenhum produto por aqui</p>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--tampa mt-6">
            Chamar no WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
