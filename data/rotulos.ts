/**
 * O que está escrito no rótulo de cada frasco, e nada além disso.
 *
 * Os números vêm da etiqueta (fotos do feed) e as frases dos benefícios
 * vêm das legendas da própria loja. Onde o rótulo lista o ativo sem a
 * quantidade, a linha entra sem valor: a vitrine não inventa dose. A
 * chave é o slug da peça no catálogo.
 */
export type Linha = { nome: string; valor?: string; nota?: string; destaque?: boolean };
export type Rotulo = {
  /** a linha de rótulo em caixa alta, como está no frasco */
  linha: string;
  forma: "cápsulas" | "gotas";
  embalagem: string;
  dose: string;
  /** o número que abre a ficha: valor e o que ele é */
  numero: { valor: string; unidade?: string; rotulo: string };
  /** para quem, na voz da loja */
  para: string[];
  /** a frase da legenda */
  frase: string;
  composicao: Linha[];
  /** o que a legenda diz que cada coisa faz, quando diz */
  notaDaTabela: string;
  objetivo: string;
};

export const ROTULOS: Record<string, Rotulo> = {
  "nutricao-para-sua-beleza": {
    linha: "Suplemento alimentar em cápsulas",
    forma: "cápsulas",
    embalagem: "60 cápsulas",
    dose: "2 cápsulas por dia",
    numero: { valor: "300", unidade: "mg", rotulo: "de Keranat® por dose diária" },
    para: ["Cabelo mais forte e encorpado", "Pele mais firme", "Unhas fortes, sem descamação"],
    frase: "Não é maquiagem. Não é efeito passageiro. Quando a nutrição é certa, o reflexo aparece em tudo.",
    composicao: [
      { nome: "Keranat®", valor: "300 mg", nota: "ativo patenteado; fortalece a estrutura do fio e reduz a quebra", destaque: true },
      { nome: "Colágeno Verisol®" },
      { nome: "Metilsulfonilmetano (MSM)" },
      { nome: "Biotina" },
      { nome: "Zinco quelato" },
      { nome: "Vitamina C" },
      { nome: "Vitamina D3" },
      { nome: "Vitamina E" },
      { nome: "Silício" },
    ],
    notaDaTabela: "Fórmula premium de beleza. As quantidades dos demais ativos estão na tabela nutricional do frasco.",
    objetivo: "beleza",
  },
  "magnesio-elementar-premium-500": {
    linha: "Suplemento alimentar em cápsulas",
    forma: "cápsulas",
    embalagem: "60 cápsulas",
    dose: "2 cápsulas por dia",
    numero: { valor: "4", rotulo: "formas de magnésio em uma fórmula" },
    para: ["Relaxamento", "Função cerebral", "Equilíbrio muscular"],
    frase: "Cansaço constante, noites mal dormidas e falta de energia podem ser sinais de que seu corpo precisa de suporte de verdade.",
    composicao: [
      { nome: "Magnésio bisglicinato", valor: "✓", nota: "alta absorção" },
      { nome: "Magnésio malato", valor: "✓" },
      { nome: "Magnésio taurato", valor: "✓" },
      { nome: "Magnésio treonato", valor: "✓" },
    ],
    notaDaTabela: "Quatro formas de alta absorção. A quantidade de magnésio elementar por dose está na tabela nutricional do frasco.",
    objetivo: "equilibrio",
  },
  "vitamina-lipossomal-d3-k2-e-a": {
    linha: "Suplemento alimentar em gotas",
    forma: "gotas",
    embalagem: "30 ml",
    dose: "em gotas; a posologia está no rótulo",
    numero: { valor: "10.000", unidade: "UI", rotulo: "de vitamina D3 por dose" },
    para: ["Imunidade", "Ossos", "Visão", "Coração"],
    frase: "Tecnologia lipossomal, desenvolvida para favorecer a absorção dos nutrientes.",
    composicao: [
      { nome: "Vitamina D3", valor: "10.000 UI", nota: "auxilia na imunidade e na saúde dos ossos e músculos", destaque: true },
      { nome: "Vitamina K2", valor: "150 mcg", nota: "o “GPS do cálcio”: ajuda a direcioná-lo para ossos e dentes" },
      { nome: "Vitamina A", valor: "1.000 UI", nota: "visão, imunidade e saúde da pele" },
    ],
    notaDaTabela: "Suplemento alimentar em gotas. Fórmula premium de alta absorção.",
    objetivo: "imunidade",
  },
};

export const OBJETIVOS: Record<string, { nome: string; frase: string }> = {
  beleza: { nome: "Cabelo, pele e unhas", frase: "Beleza também começa de dentro." },
  equilibrio: { nome: "Sono, foco e músculos", frase: "Equilíbrio real para corpo e mente." },
  imunidade: { nome: "Imunidade e ossos", frase: "Tecnologia lipossomal para favorecer a absorção." },
};

export function rotuloDe(slug: string): Rotulo | null {
  return ROTULOS[slug] ?? null;
}
