"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Research() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const openWidth = "50vw";
  const minimizedWidth = 240;
  const openHeight = "auto";
  const minimizedHeight = 56;

  const researchKeywords = [
    {
      text: "Computational Nanoscience",
      color: "text-emerald-400",
      glow: "#34D399",
      url: "https://www.nature.com/subjects/computational-nanotechnology",
    },
    {
      text: "Non-Adiabatic Dynamics",
      color: "text-cyan-400",
      glow: "#22D3EE",
      url: "https://doi.org/10.1038/s42254-021-00306-5",
    },
    {
      text: "Light-Matter Interactions",
      color: "text-violet-400",
      glow: "#A78BFA",
      url: "https://doi.org/10.1038/s42254-021-00306-5",
    },
    {
      text: "Quantum Materials",
      color: "text-pink-400",
      glow: "#F472B6",
      url: "https://en.wikipedia.org/wiki/Quantum_materials",
    },
    {
      text: "First Principles Simulations",
      color: "text-orange-400",
      glow: "#FB923C",
      url: "https://en.wikipedia.org/wiki/Ab_initio_quantum_chemistry_methods",
    },
    {
      text: "Material / Molecular Modeling",
      color: "text-indigo-400",
      glow: "#818CF8",
      url: "https://iopscience.iop.org/journal/0965-0393",
    },
    {
      text: "Scientific Visualization",
      color: "text-emerald-400",
      glow: "#34D399",
      url: "https://en.wikipedia.org/wiki/Scientific_visualization",
    },
    {
      text: "Machine Learning",
      color: "text-cyan-400",
      glow: "#22D3EE",
      url: "https://en.wikipedia.org/wiki/Machine_learning",
    },
    {
      text: "High-Performance Computing",
      color: "text-violet-400",
      glow: "#A78BFA",
      url: "https://en.wikipedia.org/wiki/High-performance_computing",
    },
  ];

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
        {/* Frosted glass overlay */}
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
              {/* Publications */}
              <h3 className="text-white font-semibold text-2xl">
                Publications
              </h3>
              <p>
                For the most updated list of my publications, please visit the
                links below:
              </p>

              <div className="flex flex-col space-y-3">
                {/* Google Scholar */}
                <a
                  href="https://scholar.google.com/citations?user=69Gy3HIAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 text-lg text-blue-300 underline underline-offset-4 decoration-blue-300/70 font-medium tracking-wide transition-all duration-300 hover:text-blue-200 hover:decoration-blue-200 hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                >
                  <Image
                    src="/images/logos/google-scholar.png"
                    alt="Google Scholar"
                    width={26}
                    height={26}
                    className="object-contain"
                  />
                  <span>Google Scholar</span>
                </a>

                {/* arXiv */}
                <a
                  href="https://arxiv.org/a/taylor_s_1.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 text-lg text-red-300 underline underline-offset-4 decoration-red-300/70 font-medium tracking-wide transition-all duration-300 hover:text-red-200 hover:decoration-red-200 hover:drop-shadow-[0_0_10px_rgba(248,113,113,0.6)]"
                >
                  <Image
                    src="/images/logos/arxiv.png"
                    alt="arXiv"
                    width={26}
                    height={26}
                    className="object-contain"
                  />
                  <span>arXiv</span>
                </a>
              </div>

              {/* Research Interests */}
              <h3 className="text-white font-semibold text-2xl mt-4">
                Research Interests
              </h3>

              <div className="flex flex-wrap gap-3">
                {researchKeywords.map((keyword) => (
                  <KeywordPill key={keyword.text} {...keyword} />
                ))}
              </div>

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
