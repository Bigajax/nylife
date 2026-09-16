import { Ampulheta } from "./Marca";
import { site } from "@/data/site.config";

/**
 * A casa, nas palavras da bio e das legendas da própria loja. Fecha a
 * home antes do rodapé, no lugar de números que a loja ainda não tem.
 */
export function Manifesto() {
  return (
    <section aria-label="A casa" className="mx-auto max-w-[76rem] px-4 pt-14 sm:px-6 lg:px-10 lg:pt-20">
      <div className="fio-rotulo" />
      <div className="grid gap-8 py-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-14 lg:py-14">
        <Ampulheta className="h-16 w-16 text-ouro lg:h-24 lg:w-24" />
        <blockquote className="max-w-[56ch]">
          <p className="falada text-[clamp(1.25rem,2.2vw,1.625rem)] text-tinta">
            Quando a ciência encontra o cuidado, o resultado é cabelo, pele e unhas mais fortes todos os dias. Não é maquiagem. Não é efeito passageiro. É
            reconstrução real, de dentro para fora.
          </p>
          <footer className="mt-4 text-[0.875rem] text-tinta-fraca">
            @{site.instagram}: nutrição inteligente para seu bem-estar, fórmulas premium e eficazes, suplementos que fazem diferença.
          </footer>
        </blockquote>
      </div>
      <div className="fio-rotulo" />
    </section>
  );
}
