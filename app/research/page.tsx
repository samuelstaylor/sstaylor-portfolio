"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Research() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const openWidth = "50vw";
  const minimizedWidth = 240;
  const openHeight = "auto";
  const minimizedHeight = 56;

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragListener={isDragging}
      dragMomentum={false}
      onDragEnd={() => setIsDragging(false)} // Reset isDragging after drag ends
      initial={{ opacity: 0, x: -40, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="pointer-events-auto fixed top-24 left-16 z-50"
    >
      <motion.div
        initial={{ width: openWidth, height: openHeight }}
        animate={{
          width: minimized ? minimizedWidth : openWidth,
          height: minimized ? minimizedHeight : openHeight,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        className="relative rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-transparent"
      >
        {/* Frosted glass overlay with delayed fade-in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.25 }}
          className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0 pointer-events-none"
        />

        {/* Header */}
        <motion.div
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          className="flex justify-between items-center px-6 py-3 h-14 relative z-10 cursor-grab"
        >
          <h2 className="text-white font-bold text-3xl select-none whitespace-nowrap">
            Research
          </h2>
          <button
            onClick={() => setMinimized(!minimized)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold transition-colors duration-300 relative z-10"
            aria-label={minimized ? "Maximize" : "Minimize"}
          >
            {minimized ? "+" : "-"}
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence>
          {!minimized && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-6 text-white/70 text-base leading-relaxed space-y-6 max-h-[70vh] overflow-y-auto scrollbar-theme relative z-10"
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
