import { site } from "@/data/site.config";

/**
 * Como se pede: três passos, porque é uma sequência de verdade. Não há
 * carrinho; o pedido é a conversa no WhatsApp da loja.
 */
const PASSOS = [
  { titulo: "Escolha o frasco", texto: "Cada produto tem o botão. A mensagem já vai com o nome do produto." },
  { titulo: "A loja responde no WhatsApp", texto: "Valor, forma de pagamento e envio se combinam na conversa." },
  { titulo: "Recebe e começa", texto: "A posologia está no rótulo: 2 cápsulas por dia, ou as gotas indicadas." },
];

export function ComoPedir({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-labelledby="titulo-como" className="tampa mt-14 lg:mt-20">
      <div className="mx-auto max-w-[76rem] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="rotulo">Como pedir</p>
            <h2 id="titulo-como" className="manchete mt-2 text-[clamp(2rem,4vw,3rem)] text-cera">
              Sem carrinho. Um WhatsApp.
            </h2>
            <p className="mt-4 max-w-[40ch] text-[1rem] leading-relaxed text-cera/75">
              A {site.nome} atende pelo WhatsApp. Você escolhe, a loja confirma, e o frasco chega.
            </p>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--tampa mt-6">
              Chamar a loja
            </a>
          </div>
          <ol className="divide-y divide-cera/15 border-y border-cera/15">
            {PASSOS.map((p, i) => (
              <li key={p.titulo} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 py-5">
                <span className="numero text-[2rem] text-ouro-claro">{i + 1}</span>
                <span>
                  <span className="titulo-cartao block text-cera">{p.titulo}</span>
                  <span className="mt-1 block text-[0.9375rem] text-cera/70">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
