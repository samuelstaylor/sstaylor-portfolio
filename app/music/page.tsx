"use client";

import { motion } from "framer-motion";

export default function Music() {
  return (
    <div className="pointer-events-none flex h-full px-16 relative">
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", x: -40, y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="
          pointer-events-auto
          w-1/2
          max-h-[calc(100vh-8rem)]
          mt-24
          mb-8
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
        <h1 className="text-4xl font-bold text-white mb-6">Music</h1>

        {/* Music content */}
        <div className="text-white/70 text-lg leading-relaxed space-y-4">
          <p>
            I am passionate about creating and exploring music alongside my
            scientific work. My music projects range from digital compositions
            to acoustic experiments, often integrating technology for immersive
            audio experiences.
          </p>

          <p>
            Some of my compositions explore themes inspired by computational
            physics, light-matter interactions, and quantum phenomena, bridging
            my research interests with musical creativity. I experiment with
            sound design, layering, and spatial audio to craft unique auditory
            landscapes.
          </p>

          <p>
            Beyond creating music, I enjoy analyzing and visualizing musical
            data, exploring patterns and structures in compositions, and sharing
            these insights through interactive web-based audio visualizations.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
