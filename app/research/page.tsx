"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Research() {
  const [minimized, setMinimized] = useState(false);
  const openWidth = "60vw";
  const minimizedWidth = 400;
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
          <h2 className="text-white font-bold text-4xl select-none">
            Research
          </h2>
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
              className="p-8 text-white/70 text-lg leading-relaxed space-y-4 max-h-[70vh] overflow-y-auto scrollbar-theme"
            >
              <p>
                Here’s my research content. I specialize in computational
                nanoscience, non-adiabatic dynamics, light-matter interactions,
                and high-fidelity 3D visualizations. My work combines
                first-principles simulations, TDDFT, and scientific computing to
                explore quantum materials, molecular fragmentation, and
                excited-state dynamics.
              </p>

              <p>
                I have experience performing large-scale TDDFT simulations,
                analyzing Coulomb explosions, and visualizing quantum phenomena.
                I also create interactive 3D scientific visualizations that help
                convey complex physics concepts clearly and effectively.
              </p>

              <p>
                Outside of direct research, I collaborate on computational
                projects, develop scientific tools, and explore new methods for
                simulating light-matter interactions in quantum materials.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
