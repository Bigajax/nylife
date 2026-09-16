import { Marca } from "./Marca";
import { PREVIA, site } from "@/data/site.config";

/**
 * O fecho, no preto da tampa: a marca, a frase da bio, os dois caminhos
 * (WhatsApp e Instagram) e a assinatura do estúdio.
 */
export function Rodape({ linkWhats, instagram }: { linkWhats: string; instagram: string; categorias?: unknown; horario?: string }) {
  return (
    <footer className="tampa mt-16 lg:mt-20">
      <div className="mx-auto max-w-[76rem] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Marca tamanho="lg" className="!text-ouro-claro" />
            <p className="mt-4 max-w-[36ch] text-[0.9375rem] text-cera/70">{site.posicionamento}.</p>
          </div>
          <nav aria-label="Caminhos" className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.9375rem]">
            <a href={linkWhats} target="_blank" rel="noreferrer" className="text-ouro-claro underline-offset-4 hover:underline">
              WhatsApp
            </a>
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="text-cera underline-offset-4 hover:underline">
              @{instagram}
            </a>
          </nav>
        </div>
        <p className="mt-10 max-w-[70ch] text-[0.75rem] leading-relaxed text-cera/50">
          Suplemento alimentar não é medicamento e não substitui uma alimentação equilibrada. Em caso de dúvida, consulte um profissional de saúde. As
          informações desta vitrine reproduzem o rótulo e as publicações da loja.
        </p>
      </div>
      <div className="border-t border-cera/10">
        <div className="mx-auto flex max-w-[76rem] flex-col items-center gap-4 px-4 py-5 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-10 lg:text-left">
          <p className="text-[0.8125rem] text-cera/55">
            © {new Date().getFullYear()} NYLIFE Nutrition. {PREVIA ? "Prévia da vitrine, ainda não é a loja." : ""}
          </p>
          <a href="https://rafaelrazeira.com.br/landing-page" target="_blank" rel="noreferrer" aria-label="Vitrine feita por Rafael Razeira Estúdio" className="flex items-center gap-3 text-cera/55 transition-colors hover:text-cera">
            <span className="text-[0.75rem]">vitrine por</span>
            <span
              role="img"
              aria-label="Rafael Razeira Estúdio"
              className="inline-block h-10 w-[74px] shrink-0 bg-current"
              style={{
                WebkitMaskImage: "url(/marca/rafael-razeira.png)",
                maskImage: "url(/marca/rafael-razeira.png)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
