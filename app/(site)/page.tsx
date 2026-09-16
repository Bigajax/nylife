import { ComoPedir } from "@/components/ComoPedir";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { ParaQuem } from "@/components/ParaQuem";
import { RotuloAberto } from "@/components/RotuloAberto";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { separar } from "@/lib/servicos";
import { linkGeral } from "@/lib/whatsapp";
import { site } from "@/data/site.config";

export default async function Home() {
  const [{ categorias, produtos }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);
  const { pecas } = separar(produtos, categorias);

  return (
    <>
      <Hero produtos={pecas} fraseHero={config.frase_hero ?? "Nutrição inteligente para o seu bem-estar."} />
      <RotuloAberto produtos={pecas} whatsapp={config.whatsapp} base={site.url} />
      <ParaQuem produtos={pecas} />
      <ComoPedir linkWhats={linkGeral(config.whatsapp)} />
      <Manifesto />
    </>
  );
}
