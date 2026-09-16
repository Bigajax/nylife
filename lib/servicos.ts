import type { Categoria, Produto } from "./tipos";

/**
 * Herdado da base: a separação entre serviço e peça. A NYLIFE só vende
 * produto, então o conjunto de serviços é vazio e tudo é peça. Fica aqui
 * para as páginas de catálogo e produto continuarem compartilhando o
 * mesmo contrato.
 */
export const SERVICOS = new Set<string>();

export const ehServico = (p: Pick<Produto, "categoria_slug">) => SERVICOS.has(p.categoria_slug ?? "");
export const ehCategoriaDeServico = (c: Pick<Categoria, "slug">) => SERVICOS.has(c.slug);

export function separar(produtos: Produto[], categorias: Categoria[]) {
  const ativos = produtos.filter((p) => p.ativo);
  return {
    atendimentos: ativos.filter(ehServico).sort((a, b) => a.ordem - b.ordem),
    pecas: ativos.filter((p) => !ehServico(p)).sort((a, b) => a.ordem - b.ordem),
    categoriasDaLoja: categorias.filter((c) => c.ativo && !ehCategoriaDeServico(c)),
  };
}
