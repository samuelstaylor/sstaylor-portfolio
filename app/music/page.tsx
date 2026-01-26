"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Music() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const openWidth = "40vw";
  const minimizedWidth = 190; // keeps title on one line
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
            Music
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
