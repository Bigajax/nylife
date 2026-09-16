import { redirect } from "next/navigation";

/* a loja tem uma prateleira só: qualquer categoria cai na lista inteira */
export default function PaginaCategoria() {
  redirect("/catalogo");
}
