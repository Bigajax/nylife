/**
 * A marca da NYLIFE: a ampulheta dentro do círculo (o símbolo do rótulo)
 * e o nome em Fraunces. O símbolo é desenhado em código, em fio, para
 * pintar com a cor do texto e aguentar qualquer tamanho: o único arquivo
 * que existe é o avatar do Instagram.
 */
export function Ampulheta({ className = "h-8 w-8", cor = "currentColor" }: { className?: string; cor?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false" fill="none" stroke={cor} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="18.5" />
      {/* a ampulheta: dois triângulos que se tocam no centro, com a areia
          desenhada em traços cruzados, como a hélice do símbolo original */}
      <path d="M13 10.5h14M13 29.5h14" />
      <path d="M14.5 10.5c0 5 3.5 7.5 5.5 9.5c-2 2-5.5 4.5-5.5 9.5M25.5 10.5c0 5-3.5 7.5-5.5 9.5c2 2 5.5 4.5 5.5 9.5" />
      <path d="M16.2 14h7.6M17.3 16.6h5.4M17.3 23.4h5.4M16.2 26h7.6" opacity="0.7" />
    </svg>
  );
}

export function Marca({ tamanho = "md", assinatura = true, className = "" }: { tamanho?: "sm" | "md" | "lg"; assinatura?: boolean; className?: string }) {
  const simbolo = tamanho === "lg" ? "h-12 w-12" : tamanho === "sm" ? "h-8 w-8" : "h-10 w-10";
  const nome = tamanho === "lg" ? "text-[1.875rem]" : tamanho === "sm" ? "text-[1.25rem]" : "text-[1.5rem]";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Ampulheta className={`${simbolo} shrink-0 text-ouro`} />
      <span className="flex flex-col leading-none">
        <span className={`manchete ${nome} tracking-[0.04em] text-[color:var(--texto)]`} style={{ fontVariationSettings: '"opsz" 48, "SOFT" 0' }}>
          NYLIFE
        </span>
        {assinatura ? <span className="rotulo mt-1">Nutrition</span> : null}
      </span>
    </span>
  );
}
