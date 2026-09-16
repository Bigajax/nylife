"use client";

import { useState } from "react";
import Image from "next/image";
import type { Imagem } from "@/lib/tipos";

/** O frasco na etiqueta grande; os outros ângulos em etiquetas pequenas. */
export function GaleriaProduto({ imagens, nome }: { imagens: Imagem[]; nome: string }) {
  const [atual, setAtual] = useState(0);
  const foto = imagens[atual];

  if (!foto) return <div className="foto aspect-[4/5] w-full" />;

  return (
    <div className="flex flex-col gap-3">
      <div className="etiqueta-foto">
        <div className="foto aspect-[4/5] w-full">
          <Image key={foto.url} src={foto.url} alt={foto.alt ?? nome} fill sizes="(max-width: 1024px) 100vw, 46vw" placeholder={foto.blur ? "blur" : "empty"} blurDataURL={foto.blur ?? undefined} priority className="object-cover" />
        </div>
      </div>
      {imagens.length > 1 ? (
        <ul className="faixa-scroll flex gap-3 overflow-x-auto" aria-label={`Fotos de ${nome}`}>
          {imagens.map((img, i) => (
            <li key={img.url} className="shrink-0">
              <button type="button" onClick={() => setAtual(i)} aria-label={`Ver foto ${i + 1} de ${imagens.length}`} aria-current={i === atual} className={`etiqueta-foto block w-16 ${i === atual ? "!border-ouro" : "opacity-70 hover:opacity-100"}`}>
                <span className="foto block aspect-[4/5]">
                  <Image src={img.url} alt="" fill sizes="64px" className="object-cover" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
