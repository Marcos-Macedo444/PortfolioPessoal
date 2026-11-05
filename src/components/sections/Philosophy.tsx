import { profile } from "@/data/profile";

export function Philosophy() {
  return (
    <aside className="philosophy container-shell">
      <span className="quote-mark" aria-hidden="true">
        “
      </span>
      <blockquote>{profile.philosophy}</blockquote>
      <p>Marcos Macêdo / O que guia meu trabalho</p>
    </aside>
  );
}
