import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups } from "../data/skills";

const ALL = "All";
const TAGS = [ALL, ...skillGroups.map((g) => g.title)];

export default function Skills() {
  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(() => {
    if (active === ALL) return skillGroups;
    return skillGroups.filter((g) => g.title === active);
  }, [active]);

  return (
    <section id="skills" className="py-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-center"
      >
        Skills
      </motion.h2>

      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        {TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-3 py-1.5 rounded-full text-sm border border-white/10 transition
              ${
                active === tag
                  ? "bg-white text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filtered.map((group) => (
            <motion.div
              key={group.title}
              layout
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, y: 12 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
                    title={s}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
