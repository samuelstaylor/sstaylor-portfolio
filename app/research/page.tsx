"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Research() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const openWidth = "50vw";
  const minimizedWidth = 450;
  const openHeight = "auto";
  const minimizedHeight = 56;

  const researchKeywords = [
    {
      text: "Computational Nanoscience",
      color: "text-emerald-400",
      glow: "#34D399",
      url: "",
    },
    {
      text: "Non-Adiabatic Dynamics",
      color: "text-cyan-400",
      glow: "#22D3EE",
      url: "",
    },
    {
      text: "Light-Matter Interactions",
      color: "text-violet-400",
      glow: "#A78BFA",
      url: "",
    },
    {
      text: "Quantum Materials",
      color: "text-pink-400",
      glow: "#F472B6",
      url: "",
    },
    {
      text: "TDDFT Simulations",
      color: "text-orange-400",
      glow: "#FB923C",
      url: "",
    },
    {
      text: "Coulomb Explosions",
      color: "text-indigo-400",
      glow: "#818CF8",
      url: "",
    },
    {
      text: "Scientific Visualization",
      color: "text-emerald-400",
      glow: "#34D399",
      url: "",
    },
    {
      text: "Machine Learning",
      color: "text-cyan-400",
      glow: "#22D3EE",
      url: "",
    },
    {
      text: "High-Performance Computing",
      color: "text-violet-400",
      glow: "#A78BFA",
      url: "",
    },
  ];

  const linkClass =
    "text-emerald-300 hover:text-emerald-400 underline decoration-emerald-500/50 hover:decoration-emerald-400 transition-colors duration-300";

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragListener={isDragging}
      dragMomentum={false}
      onDragEnd={() => setIsDragging(false)}
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
              {/* Google Scholar Link */}
              <p>
                <a
                  href="https://scholar.google.com/citations?user=69Gy3HIAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-lg text-emerald-300 underline underline-offset-4 decoration-emerald-300/70 font-medium tracking-wide transition-all duration-300 hover:text-emerald-200 hover:decoration-emerald-200 hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                >
                  View Google Scholar
                </a>
              </p>

              {/* Keywords / Research Interests */}
              <h3 className="text-white font-semibold text-2xl mt-2">
                Research Interests
              </h3>
              <div className="flex flex-wrap gap-3">
                {researchKeywords.map((keyword) => (
                  <KeywordPill key={keyword.text} {...keyword} />
                ))}
              </div>

              {/* Research Description */}
              <p>
                I specialize in computational nanoscience, non-adiabatic
                dynamics, light-matter interactions, and high-fidelity 3D
                visualizations. My work combines first-principles simulations,
                TDDFT, and scientific computing to explore quantum materials,
                molecular fragmentation, and excited-state dynamics.
              </p>

              <p>
                I have experience performing large-scale TDDFT simulations,
                analyzing Coulomb explosions, and creating interactive
                scientific visualizations to communicate complex quantum
                phenomena clearly.
              </p>

              <p>
                I also collaborate on computational projects, develop scientific
                tools, and explore new methods for simulating light-matter
                interactions in quantum materials.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// -----------------------
// Keyword Pill component
// -----------------------
function KeywordPill({
  text,
  color,
  glow,
  url,
}: {
  text: string;
  color: string;
  glow: string;
  url: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <a href={url || "#"} target="_blank" rel="noopener noreferrer">
      <span
        className={`px-3 py-1 rounded-full bg-white/10 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 ${color}`}
        style={{ boxShadow: hover ? `0 0 15px ${glow}` : "none" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {text}
      </span>
    </a>
  );
}
