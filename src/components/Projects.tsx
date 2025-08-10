import { projects, type Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

const CATS = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const [cat, setCat] = useState<string>("All");
  const filtered = useMemo<Project[]>(
    () =>
      (cat === "All"
        ? [...projects]
        : projects.filter((p) => p.category === cat)) as Project[],
    [cat]
  );

  return (
    <section id="projects" className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-center"
      >
        Featured Projects
      </motion.h2>

      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-sm border border-white/10 transition ${
              cat === c ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
