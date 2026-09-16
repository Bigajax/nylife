/**
 * Herdadas da base, usadas pelo painel. A régua é o título com o fio de
 * rótulo em cima.
 */
export function Moldura(_props: { legenda?: string; aresta?: "topo" | "base"; clara?: boolean }) {
  return <span className="moldura" aria-hidden="true" />;
}

export function Regua({ children, id, rotulo }: { children: React.ReactNode; id?: string; rotulo?: string }) {
  return (
    <div className="regua">
      <div>
        {rotulo ? <p className="rotulo">{rotulo}</p> : null}
        <h2 id={id} className="secao mt-1 text-tinta">
          {children}
        </h2>
      </div>
    </div>
  );
}
