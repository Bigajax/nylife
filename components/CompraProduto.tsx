"use client";

import { useState } from "react";
import { precoBRL } from "@/lib/formato";
import { linkPeca } from "@/lib/whatsapp";
import type { Produto } from "@/lib/tipos";

/**
 * O pedido, montado antes de sair: quantidade de frascos e uma
 * observação. Vai numa mensagem estruturada para o WhatsApp. Não existe
 * carrinho: a conversa é o pedido.
 */
export function CompraProduto({ produto, whatsapp, base }: { produto: Produto; whatsapp: string; base: string; atendimento?: boolean }) {
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState("");

  const preco = produto.preco_promocional ?? produto.preco;
  const total = preco !== null ? preco * quantidade : null;
  const link = linkPeca(produto, { whatsapp, base, quantidade, observacao, preco });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
        <div>
          <p className="etiqueta mb-2">Frascos</p>
          <div className="inline-flex items-stretch overflow-hidden rounded-[2px] border border-fio bg-white">
            <button type="button" onClick={() => setQuantidade((q) => Math.max(1, q - 1))} aria-label="Um a menos" className="px-4 text-[1.125rem] text-tinta hover:bg-etiqueta disabled:opacity-40" disabled={quantidade <= 1}>
              −
            </button>
            <input
              type="number"
              min={1}
              max={20}
              inputMode="numeric"
              value={quantidade}
              onChange={(e) => setQuantidade(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
              aria-label="Quantidade de frascos"
              className="w-14 border-x border-fio bg-white text-center text-[1rem] text-tinta [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button type="button" onClick={() => setQuantidade((q) => Math.min(20, q + 1))} aria-label="Um a mais" className="px-4 text-[1.125rem] text-tinta hover:bg-etiqueta">
              +
            </button>
          </div>
        </div>
        <label className="campo-flutuante">
          <span>Alguma observação?</span>
          <input value={observacao} onChange={(e) => setObservacao(e.target.value)} placeholder="Uma dúvida, um recado para a loja" maxLength={140} />
        </label>
      </div>

      <div className="fio-rotulo pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[0.9375rem] text-tinta-fraca">
            {quantidade} {quantidade === 1 ? "frasco" : "frascos"}
            {preco !== null ? ` de ${precoBRL(preco)}` : ""}
          </span>
          <span className="preco text-[1.25rem] text-tinta">{total !== null ? precoBRL(total) : "valor na conversa"}</span>
        </div>
        <a href={link} target="_blank" rel="noreferrer" className="btn btn--tampa mt-4 w-full">
          Pedir pelo WhatsApp
        </a>
        <p className="miudo mt-3">A mensagem já vai com o produto e a quantidade. A loja confirma o valor, o pagamento e o envio.</p>
      </div>
    </div>
  );
}
