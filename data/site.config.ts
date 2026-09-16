/**
 * Dados fixos do negócio. O que a loja edita no dia a dia (aviso do topo,
 * frase do hero, WhatsApp) vive na tabela `config` e é editável em
 * /painel/config, não aqui.
 */

function resolverUrl(): string {
  const candidatos = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const bruto of candidatos) {
    const valor = bruto?.trim();
    if (!valor) continue;
    const comProtocolo = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
    try {
      return new URL(comProtocolo).origin;
    } catch {
      // valor malformado: tenta o próximo em vez de derrubar o build
    }
  }

  return "http://localhost:3080";
}

export const site = {
  nome: "NYLIFE Nutrition",
  marca: "NYLIFE",
  assinatura: "Nutrition",
  posicionamento: "Nutrição inteligente para o seu bem-estar: fórmulas premium, de dentro para fora",
  /* a loja não diz a cidade no Instagram; o DDD do WhatsApp é 41. Até
     confirmar, a vitrine não fala de lugar nem de entrega. */
  cidade: "",
  /* o número da LOJA, o do link da bio. Na prévia ele não é usado: ver PREVIA. */
  whatsapp: "5541974036792",
  instagram: "nylife_nutrition",
  url: resolverUrl(),
} as const;

/**
 * MODO PRÉVIA. Enquanto a vitrine é uma amostra, TODO botão de WhatsApp
 * aponta para o estúdio com a mesma mensagem: quem clica é a dona da loja
 * dizendo que quer a vitrine no ar, não uma cliente pedindo produto.
 * Quando a loja contratar: PREVIA = null e o número acima passa a valer.
 */
export const PREVIA: { whatsapp: string; mensagem: string } | null = {
  whatsapp: "5544999997219",
  mensagem: "Oi! Vi a prévia da vitrine da NYLIFE Nutrition e quero colocar no ar.",
};

/** Valores iniciais da tabela `config`. Sobrescritos pelo banco quando existirem. */
export const configPadrao: Record<string, string> = {
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  cidade: site.cidade,
  aviso_topo: "",
  frase_hero: "Nutrição inteligente para o seu bem-estar.",
  endereco: "",
  horario: "",
};
