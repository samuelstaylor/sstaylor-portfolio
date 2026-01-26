"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Music() {
  const [minimized, setMinimized] = useState(false);
  const openWidth = "50vw";
  const minimizedWidth = 300; // keeps title on one line
  const openHeight = "auto";
  const minimizedHeight = 56;

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragMomentum={false}
      initial={{ opacity: 0, filter: "blur(12px)", x: -40, y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="pointer-events-auto fixed top-24 left-16 z-50 cursor-grab"
    >
      <motion.div
        initial={{ width: openWidth, height: openHeight }}
        animate={{
          width: minimized ? minimizedWidth : openWidth,
          height: minimized ? minimizedHeight : openHeight,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden relative"
      >
        <div className="flex justify-between items-center px-4 py-2 h-14">
          <h2 className="text-white font-bold text-4xl select-none">Music</h2>
          <button
            onClick={() => setMinimized(!minimized)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold transition-colors duration-300"
            aria-label={minimized ? "Maximize" : "Minimize"}
          >
            {minimized ? "+" : "-"}
          </button>
        </div>

        <AnimatePresence>
          {!minimized && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-4 text-white/70 text-lg leading-relaxed space-y-4 max-h-[70vh] overflow-y-auto scrollbar-theme"
            >
              <p>
                I am passionate about creating and exploring music alongside my
                scientific work. My music projects range from digital
                compositions to acoustic experiments, often integrating
                technology for immersive audio experiences.
              </p>

              <p>
                Some of my compositions explore themes inspired by computational
                physics, light-matter interactions, and quantum phenomena,
                bridging my research interests with musical creativity. I
                experiment with sound design, layering, and spatial audio to
                craft unique auditory landscapes.
              </p>

              <p>
                Beyond creating music, I enjoy analyzing and visualizing musical
                data, exploring patterns and structures in compositions, and
                sharing these insights through interactive web-based audio
                visualizations.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
