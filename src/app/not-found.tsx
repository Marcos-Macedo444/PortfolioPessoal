import Link from "next/link";
import { Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-matrix-black px-6 text-matrix-text">
      <section className="cyber-panel max-w-xl rounded-lg p-8 text-center">
        <Terminal className="mx-auto mb-4 h-10 w-10 text-matrix-green" aria-hidden />
        <p className="font-mono text-sm uppercase text-matrix-cyan">404 / route not indexed</p>
        <h1 className="mt-3 text-3xl font-semibold">Página não encontrada</h1>
        <p className="mt-3 text-matrix-muted">
          Este endpoint não existe no portfolio runtime. Volte para a interface principal.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md border border-matrix-green/50 px-4 py-2 text-sm font-semibold text-matrix-green transition hover:bg-matrix-green hover:text-matrix-black"
        >
          Voltar ao início
        </Link>
      </section>
    </main>
  );
}
