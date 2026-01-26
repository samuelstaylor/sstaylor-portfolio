"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="pointer-events-none flex h-full px-16 relative">
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", x: 40, y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="
          pointer-events-auto
          w-1/3
          max-h-[calc(100vh-8rem)]
          mt-24
          mb-8
          ml-auto                  /* push to the right */
          overflow-y-auto
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-2xl
          p-8
          relative
          z-10
          scrollbar-theme
        "
      >
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-white mb-6">Contact</h1>

        {/* Contact content */}
        <div className="text-white/70 text-lg leading-relaxed space-y-4">
          <p>
            I’m always happy to connect! Whether you’re interested in my
            research, collaborations, or just want to chat about science and
            technology, feel free to reach out.
          </p>

          <p>
            You can contact me via email at{" "}
            <a
              href="mailto:samuel.taylor@example.com"
              className="underline text-emerald-400 hover:text-emerald-300"
            >
              samuel.taylor@example.com
            </a>
            .
          </p>

          <p>
            I’m also active on professional networks such as LinkedIn and
            research platforms where you can follow my work and projects.
          </p>

          <p>
            For inquiries about talks, collaborations, or media, please don’t
            hesitate to get in touch using the email above.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
