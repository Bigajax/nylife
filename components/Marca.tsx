/**
 * A marca da NYLIFE: a logo real, tirada do avatar do Instagram (1024px,
 * ouro sobre branco) e convertida em PNG com alfa (`public/marca/logo.png`
 * e `simbolo.png`). Entra como MÁSCARA pintada pela cor do texto: ouro
 * no papel, ouro-claro na tampa preta. Assim aguenta qualquer fundo sem
 * precisar de arquivo por cor.
 */
const ARQUIVOS = {
  logo: { arquivo: "/marca/logo.png", proporcao: 709 / 435 },
  simbolo: { arquivo: "/marca/simbolo.png", proporcao: 175 / 169 },
} as const;

function Mascara({ parte, altura, className = "", rotulo }: { parte: keyof typeof ARQUIVOS; altura: number; className?: string; rotulo?: string }) {
  const { arquivo, proporcao } = ARQUIVOS[parte];
  return (
    <span
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height: altura,
        width: Math.round(altura * proporcao),
        WebkitMaskImage: `url(${arquivo})`,
        maskImage: `url(${arquivo})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/** Só o símbolo: a hélice dentro do círculo. */
export function Ampulheta({ className = "h-8 w-8" }: { className?: string; cor?: string }) {
  /* a altura vem da classe; a largura acompanha (o símbolo é quase quadrado) */
  const altura = Number((className.match(/h-(\d+)/) ?? [])[1] ?? 8) * 4;
  return <Mascara parte="simbolo" altura={altura} className={className.replace(/w-\S+/, "")} />;
}

/** A logo inteira: símbolo, NYLIFE e NUTRITION, como no frasco. */
export function Marca({ tamanho = "md", className = "" }: { tamanho?: "sm" | "md" | "lg"; assinatura?: boolean; className?: string }) {
  const altura = tamanho === "lg" ? 64 : tamanho === "sm" ? 40 : 48;
  return <Mascara parte="logo" altura={altura} className={`text-ouro ${className}`} rotulo="NYLIFE Nutrition" />;
}
