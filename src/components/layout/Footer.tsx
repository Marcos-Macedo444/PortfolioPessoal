import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Monogram } from "@/components/ui/Monogram";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-shell">
        <div className="footer-top">
          <a
            className="brand"
            href="#inicio"
            aria-label="Marcos Macêdo, início"
          >
            <Monogram />
            <span>
              {profile.name}
              <span className="accent">.</span>
            </span>
          </a>
          <div className="footer-links">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={13} />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <a href={`mailto:${profile.email}`}>
              E-mail <ArrowUpRight size={13} />
            </a>
          </div>
          <a className="text-link" href="#inicio">
            Voltar ao início <ArrowUp size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Marcos Macêdo. Todos os direitos
            reservados.
          </p>
          <p>Feito por mim. Conectado ao que importa.</p>
        </div>
      </div>
    </footer>
  );
}
