import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";

export default function NotFound() {
  return (
    <main className="not-found">
      <Monogram />
      <p className="eyebrow">404 / Caminho não encontrado</p>
      <h1>
        Essa conexão
        <br />
        ainda não existe<span className="accent">.</span>
      </h1>
      <p>
        A página pode ter mudado de endereço. Meu portfólio continua por aqui.
      </p>
      <Link className="button" href="/">
        <ArrowLeft size={16} />
        Voltar ao início
      </Link>
    </main>
  );
}
