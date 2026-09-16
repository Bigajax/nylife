import type { Rotulo } from "@/data/rotulos";

/**
 * A tabela de composição: o nome à esquerda, o valor à direita em
 * tabular, o fio de rótulo fechando embaixo. Linha em destaque para o
 * ativo que a loja mais fala (Keranat, D3). Os ativos que o rótulo lista
 * sem quantidade entram juntos numa linha só: a vitrine não inventa dose,
 * e oito "na fórmula" seguidos não dizem nada.
 */
export function Composicao({ rotulo, compacta = false }: { rotulo: Rotulo; compacta?: boolean }) {
  const comValor = rotulo.composicao.filter((l) => l.valor);
  const semValor = rotulo.composicao.filter((l) => !l.valor);

  return (
    <table className="composicao">
      <caption className="sr-only">Composição</caption>
      <thead>
        <tr>
          <th scope="col" className="rotulo !border-b-2 !border-[color:var(--texto)] pb-2 !text-[color:var(--ouro-texto)]">
            Composição
          </th>
          <td className="rotulo !border-b-2 !border-[color:var(--texto)] pb-2 !text-[color:var(--ouro-texto)]">{compacta ? "por dose" : `por dose (${rotulo.dose.split(";")[0]})`}</td>
        </tr>
      </thead>
      <tbody>
        {comValor.map((l) => (
          <tr key={l.nome} className={l.destaque ? "destaque" : ""}>
            <th scope="row">
              {l.nome}
              {!compacta && l.nota ? <small>{l.nota}</small> : null}
            </th>
            <td>{l.valor}</td>
          </tr>
        ))}
        {semValor.length ? (
          <tr>
            <th scope="row" className="!font-normal">
              <span className="text-tinta-fraca">Também na fórmula: </span>
              {semValor.map((l) => l.nome).join(", ")}
            </th>
            <td className="vazio">{semValor.length} ativos</td>
          </tr>
        ) : null}
      </tbody>
      {!compacta ? (
        <tfoot>
          <tr>
            <td colSpan={2}>{rotulo.notaDaTabela}</td>
          </tr>
        </tfoot>
      ) : null}
    </table>
  );
}
