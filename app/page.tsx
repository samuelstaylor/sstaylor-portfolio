"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="pointer-events-none flex h-full items-center px-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
        className="
          pointer-events-auto
          max-w-3xl
          rounded-3xl
          bg-white/15
          backdrop-blur-lg
          border border-white/20
          shadow-2xl
          p-12
        "
      >
        {/* Name */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
          Samuel Taylor
        </h1>

        {/* NSF / PME Fellow */}
        <p className="mt-2 text-white/70 text-lg font-medium">
          NSF GRFP Fellow · PME Graduate Fellow
        </p>

        {/* Keywords / chips */}
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-sm font-medium">
            Computational Nanoscience
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-cyan-400 text-sm font-medium">
            Non-Adiabatic Dynamics
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-violet-400 text-sm font-medium">
            Light-Matter Interactions
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-400 text-sm font-medium">
            Quantum Materials
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-pink-400 text-sm font-medium">
            TDDFT Simulations
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-orange-400 text-sm font-medium">
            3D Scientific Visualization
          </span>
        </div>

        {/* Short bio / welcome message */}
        <p className="mt-6 text-white/70 text-lg leading-relaxed">
          Welcome! I am a Ph.D. student in Quantum Science and Engineering at
          the University of Chicago, specializing in computational nanoscience,
          excited-state dynamics, and high-fidelity 3D visualizations. My
          research combines first-principles simulations, TDDFT, and scientific
          computing to explore quantum materials, light–matter interactions, and
          molecular fragmentation.
        </p>
      </motion.div>
    </div>
  );
}
