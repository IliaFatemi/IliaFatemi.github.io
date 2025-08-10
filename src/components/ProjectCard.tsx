import { motion } from "framer-motion";
import type { Project } from "../data/projects";
import { useRef } from "react";

export default function ProjectCard(p: Project) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -8;
    const ry = ((x - r.width / 2) / r.width) * 8;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }
  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  // Use the link from the project data; fallback to internal page if missing
  const href = p.link || `/projects/${p.slug}`;
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <motion.a
      ref={ref}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ y: -6 }}
      className="relative glass rounded-xl overflow-hidden block transition-transform"
      style={{
        backgroundImage:
          "radial-gradient(400px circle at var(--mx, -100px) var(--my, -100px), rgba(255,255,255,.06), transparent 40%)",
      }}
      aria-label={`${p.title} — open ${
        isExternal ? "external link" : "details"
      }`}
      title={p.title}
    >
      <div className="aspect-video bg-white/5">
        <img
          src={p.img}
          alt={p.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{p.title}</h3>
        <p className="mt-1 text-sm text-white/70">{p.desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-full bg-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
