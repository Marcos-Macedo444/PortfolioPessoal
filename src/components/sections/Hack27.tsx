"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";

const images = [
  {
    src: "/images/hack27/Team.jpg",
    alt: "Equipe RED BOOST reunida no Hack27",
    caption: "A equipe / RED BOOST",
  },
  {
    src: "/images/hack27/Presentation.jpg",
    alt: "Apresentação final da solução da RED BOOST no Hack27",
    caption: "O pitch / Apresentação final",
  },
  {
    src: "/images/hack27/Award.jpg",
    alt: "Premiação da equipe RED BOOST no Hack27",
    caption: "A conquista / Premiação",
  },
  {
    src: "/images/hack27/Team2.jpg",
    alt: "Outro registro da equipe RED BOOST no Hack27",
    caption: "Juntos / Equipe RED BOOST",
  },
  {
    src: "/images/hack27/Award2.jpg",
    alt: "Registro complementar da premiação da RED BOOST",
    caption: "Uma conquista coletiva / Hack27",
  },
];

export function Hack27() {
  const [selected, setSelected] = useState(0);
  return (
    <section id="hack27" className="section achievement-section">
      <div className="container-shell">
        <div className="achievement-heading">
          <div>
            <p className="eyebrow">04 / Uma conquista coletiva</p>
            <h2>
              Ideias conectadas.
              <br />
              <span className="accent">Impacto em equipe.</span>
            </h2>
          </div>
          <span className="award-label">
            <Trophy size={22} />
            <span>
              Campeão
              <br />
              <strong>Hack27</strong>
            </span>
          </span>
        </div>
        <div className="achievement-grid">
          <figure className="achievement-photo">
            <div className="achievement-image">
              <Image
                key={images[selected].src}
                src={images[selected].src}
                alt={images[selected].alt}
                fill
                sizes="(max-width:700px) 90vw, 65vw"
                className="object-contain"
              />
            </div>
            <figcaption>
              <span>{images[selected].caption}</span>
              <div className="gallery-controls">
                <span>{String(selected + 1).padStart(2, "0")} / 05</span>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Foto anterior do Hack27"
                  onClick={() =>
                    setSelected((selected + images.length - 1) % images.length)
                  }
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Próxima foto do Hack27"
                  onClick={() => setSelected((selected + 1) % images.length)}
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </figcaption>
          </figure>
          <div className="achievement-copy">
            <span className="team-wordmark">
              RED
              <br />
              <span>BOOST</span>
              <span className="accent">↗</span>
            </span>
            <p>
              Uma solução gamificada para tornar treinamentos corporativos mais
              engajadores, dinâmicos e mensuráveis.
            </p>
            <p>
              Na RED BOOST, conectei colaboração, pensamento de produto,
              comunicação e apresentação técnica para defender nossa solução na
              apresentação final.
            </p>
            <ul className="plain-tags">
              <li>Trabalho em equipe</li>
              <li>Liderança</li>
              <li>Comunicação</li>
              <li>Inovação</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
