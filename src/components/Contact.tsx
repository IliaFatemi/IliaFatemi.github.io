import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-3xl md:text-4xl font-bold text-center"
      >
        Get in touch
      </motion.h2>

      <form
        action="https://formspree.io/f/your-id" /* replace with your Formspree ID */
        method="POST"
        className="max-w-xl mx-auto mt-8 glass rounded-2xl p-6 grid gap-4"
      >
        <input
          name="name"
          placeholder="Your name"
          required
          className="bg-transparent border border-white/15 rounded-lg px-4 py-3"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="bg-transparent border border-white/15 rounded-lg px-4 py-3"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          required
          className="bg-transparent border border-white/15 rounded-lg px-4 py-3"
        />
        <button className="rounded-lg px-5 py-3 bg-white text-black font-semibold">
          Send
        </button>
      </form>
    </section>
  );
}
