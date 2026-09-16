"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Ampulheta, Marca } from "./Marca";
import type { Produto } from "@/lib/tipos";

/**
 * O cabeçalho: a marca à esquerda, os três produtos no meio (a loja é
 * pequena, então o menu é a própria prateleira), o WhatsApp à direita.
 * No celular vira menu, marca no centro e WhatsApp.
 */
export function Cabecalho({ produtos, linkWhats }: { produtos: Produto[]; linkWhats: string }) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fechar);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  const portas = [...produtos.map((p) => ({ href: `/produto/${p.slug}`, nome: nomeCurto(p.nome) })), { href: "/catalogo", nome: "Todos" }];

  return (
    <header className="relative z-50 bg-etiqueta">
      <div className="mx-auto flex h-[4.5rem] max-w-[76rem] items-center justify-between gap-3 px-4 sm:px-6 lg:h-[5.25rem] lg:px-10">
        <button
          type="button"
          onClick={() => setAberto(true)}
          aria-expanded={aberto}
          aria-controls="gaveta"
          className="flex h-11 w-11 items-center justify-center text-tinta lg:hidden"
          aria-label="Abrir o menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </button>

        <Link href="/" aria-label="NYLIFE Nutrition, página inicial" className="flex shrink-0 items-center">
          <span className="lg:hidden">
            <Marca tamanho="sm" />
          </span>
          <span className="hidden lg:inline-flex">
            <Marca tamanho="md" />
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {portas.map((p) => (
            <Link key={p.href} href={p.href} className="text-[0.9375rem] text-tinta transition-colors hover:text-ouro-escuro">
              {p.nome}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden lg:block">
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--tampa px-5 py-3">
              <IconeWhats />
              WhatsApp
            </a>
          </span>
          <a href={linkWhats} target="_blank" rel="noreferrer" aria-label="Chamar no WhatsApp" className="flex h-11 w-11 items-center justify-center text-tinta lg:hidden">
            <IconeWhats className="h-6 w-6" />
          </a>
        </div>
      </div>
      <div className="fio-rotulo mx-auto max-w-[76rem] px-4 sm:px-6 lg:px-10" />

      {aberto ? (
        <>
          <button type="button" aria-label="Fechar o menu" onClick={() => setAberto(false)} className="fixed inset-0 z-40 bg-tampa/50 lg:hidden" />
          <nav id="gaveta" aria-label="Menu" className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,86vw)] flex-col bg-etiqueta px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <Ampulheta className="h-9 w-9 text-ouro" />
              <button type="button" onClick={() => setAberto(false)} className="text-[0.9375rem] text-tinta-fraca">
                Fechar
              </button>
            </div>
            <p className="rotulo mt-8">Os produtos</p>
            <ul className="mt-2 divide-y divide-fio border-y border-fio">
              {portas.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} onClick={() => setAberto(false)} className="titulo-cartao block py-3 text-tinta">
                    {p.nome}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--tampa mt-auto w-full">
              Pedir pelo WhatsApp
            </a>
          </nav>
        </>
      ) : null}
    </header>
  );
}

/** "Magnésio Elementar Premium 500" vira "Magnésio" no menu. */
export function nomeCurto(nome: string) {
  if (/magn/i.test(nome)) return "Magnésio";
  if (/beleza/i.test(nome)) return "Beleza";
  if (/vitamina/i.test(nome)) return "Vitaminas";
  return nome.split(" ")[0];
}

export function IconeWhats({ className = "h-4.5 w-4.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2c.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4z" />
    </svg>
  );
}
