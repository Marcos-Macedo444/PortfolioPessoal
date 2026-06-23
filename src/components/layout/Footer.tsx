import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-matrix-black/85 py-8">
      <div className="container-shell flex flex-col gap-5 text-sm text-matrix-muted md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-matrix-text">{profile.name}</p>
          <p className="mt-1 font-mono text-xs">System Online / Portfolio Runtime</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-matrix-green"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-matrix-cyan"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition hover:text-matrix-green">
            <Mail className="h-4 w-4" aria-hidden />
            E-mail
          </a>
        </div>
      </div>
    </footer>
  );
}
