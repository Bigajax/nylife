import type { Metadata } from "next";
import { Catalogo } from "@/components/Catalogo";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { separar } from "@/lib/servicos";
import { linkGeral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Os produtos",
  description: "Nutrição para sua Beleza, Magnésio Elementar Premium 500 e Vitamina Lipossomal D3, K2 e A. Suplementos NYLIFE Nutrition, pedidos pelo WhatsApp.",
  alternates: { canonical: "/catalogo" },
};

export default async function PaginaCatalogo() {
  const [{ categorias, produtos }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);
  const { pecas } = separar(produtos, categorias);

  return (
    <>
      <header className="mx-auto max-w-[76rem] px-4 pb-8 pt-10 sm:px-6 lg:px-10 lg:pb-10 lg:pt-14">
        <p className="rotulo">Suplemento alimentar</p>
        <h1 className="manchete mt-2 text-[clamp(2rem,4.5vw,3.25rem)] text-tinta">Os produtos</h1>
        <p className="mt-3 max-w-[48ch] text-[1.0625rem] text-tinta-fraca">
          {pecas.length} frascos, com o que está escrito no rótulo. Toca num para ver a composição e pedir pelo WhatsApp.
        </p>
      </header>
      <Catalogo produtos={pecas} linkWhats={linkGeral(config.whatsapp)} />
    </>
  );
}
