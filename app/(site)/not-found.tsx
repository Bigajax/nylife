import Link from "next/link";
import { Ampulheta } from "@/components/Marca";

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex max-w-[76rem] items-center justify-center px-4 py-32 sm:px-6 lg:px-10">
      <div className="max-w-md text-center">
        <Ampulheta className="mx-auto h-14 w-14 text-ouro" />
        <p className="manchete mt-6 text-[2rem] text-tinta">Esse frasco não está na prateleira.</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-tinta-fraca">O endereço mudou ou o produto saiu da vitrine. Comece pelos produtos.</p>
        <Link href="/catalogo" className="btn btn--tampa mt-7">
          Ver os produtos
        </Link>
      </div>
    </div>
  );
}
