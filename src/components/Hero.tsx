import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TypedOpts = {
  typeSpeed?: number;
  backSpeed?: number;
  startDelay?: number;
  endHold?: number;
  startHold?: number;
  loop?: boolean;
};

function useTyped(
  lines: string[],
  {
    typeSpeed = 45,
    backSpeed = 30,
    startDelay = 300,
    endHold = 1100,
    startHold = 400,
    loop = true,
  }: TypedOpts = {}
) {
  const [text, setText] = useState("");
  const idx = useRef(0);
  const pos = useRef(0);
  const dir = useRef<1 | -1>(1);
  const toRef = useRef<number | null>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    if (!lines.length) return;

    const tick = () => {
      if (!alive.current) return;
      const target = lines[idx.current] ?? "";
      pos.current += dir.current;
      const j = Math.max(0, Math.min(target.length, pos.current));
      setText(target.slice(0, j));

      if (dir.current > 0 && j >= target.length) {
        dir.current = -1;
        toRef.current = window.setTimeout(tick, endHold);
        return;
      }
      if (dir.current < 0 && j <= 0) {
        if (!loop && idx.current === lines.length - 1) return;
        dir.current = 1;
        idx.current = (idx.current + 1) % lines.length;
        toRef.current = window.setTimeout(tick, startHold);
        return;
      }
      toRef.current = window.setTimeout(
        tick,
        dir.current > 0 ? typeSpeed : backSpeed
      );
    };

    toRef.current = window.setTimeout(tick, startDelay);
    return () => {
      alive.current = false;
      if (toRef.current) clearTimeout(toRef.current);
    };
  }, [
    JSON.stringify(lines),
    typeSpeed,
    backSpeed,
    startDelay,
    endHold,
    startHold,
    loop,
  ]);

  return text;
}

export default function Hero() {
  const typed = useTyped(
    [
      "Full-stack developer",
      "Angular • Flask • PostgreSQL",
      "Deployed on Azure",
    ],
    { typeSpeed: 45, backSpeed: 30, endHold: 1100, startHold: 400 }
  );

  // subtle 3D tilt on the avatar
  const cardRef = useRef<HTMLDivElement>(null);
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * -8;
    const ry = ((x - r.width / 2) / r.width) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function onLeave() {
    const el = cardRef.current;
    if (el)
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <section className="min-h-[78vh] flex items-center">
      <div className="mx-auto max-w-6xl px-5 grid items-center gap-10 md:grid-cols-2">
        {/* Left: big avatar with glow */}
        <div className="relative justify-self-center md:justify-self-start">
          {/* glow backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-[2rem] blur-3xl"
            style={{
              background:
                "radial-gradient(40% 40% at 60% 30%, rgba(99,102,241,.35), transparent 70%), radial-gradient(40% 40% at 30% 70%, rgba(59,130,246,.35), transparent 70%)",
              filter: "saturate(120%)",
            }}
          />
          <motion.div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-72 md:w-72 rounded-3xl overflow-hidden ring-2 ring-white/20 shadow-[0_0_60px_rgba(99,102,241,0.25)]"
          >
            <img
              src="https://avatars.githubusercontent.com/u/50119987?v=4"
              alt="Ilia Fatemi"
              className="h-full w-full object-cover"
            />
            {/* subtle inner gradient for depth */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top right, rgba(0,0,0,.25), rgba(0,0,0,0) 60%)",
                mixBlendMode: "multiply",
              }}
            />
          </motion.div>
        </div>

        {/* Right: text + CTAs */}
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight
                       bg-gradient-to-r from-white via-white/85 to-white/60 bg-clip-text text-transparent"
          >
            Ilia Fatemi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-lg md:text-xl text-white/70 h-[1.75rem]"
          >
            {typed}
            <span aria-hidden className="animate-pulse">
              ▍
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex gap-3 justify-center md:justify-start"
          >
            <a href="#projects" className="glass px-5 py-3 rounded-lg">
              View Projects
            </a>
            <a
              href="https://raw.githubusercontent.com/IliaFatemi/IliaFatemi/main/Ilia_Fatemi_Resume.pdf"
              className="px-5 py-3 rounded-lg bg-white text-black"
            >
              Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
