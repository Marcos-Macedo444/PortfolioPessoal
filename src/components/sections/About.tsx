import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="sobre" className="section about-section">
      <span className="about-thread" aria-hidden="true" />
      <div className="container-shell about-grid">
        <div className="portrait-composition">
          <div className="portrait-frame">
            <Image
              src="/images/profile/profile.png"
              alt="Marcos Macêdo sorrindo, de camisa vinho e braços cruzados"
              fill
              sizes="(max-width:700px) 85vw, 430px"
              className="portrait-image"
            />
          </div>
          <span className="photo-index">MM. / POR TRÁS DAS CONEXÕES</span>
          <span className="portrait-corner" aria-hidden="true" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">02 / Sobre mim</p>
          <h2>
            A tecnologia começa
            <br />
            com um problema real<span className="accent">.</span>
          </h2>
          <p>{profile.about}</p>
          <p>
            Gosto de entender como as partes se conectam: da rede ao serviço, da
            necessidade à solução. É nesse encontro entre operação, aprendizado
            e desenvolvimento que construo meu caminho.
          </p>
          <div className="about-signature">
            <span className="display">
              Marcos Macêdo<span className="accent">.</span>
            </span>
            <a
              className="text-link"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Meu LinkedIn <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
