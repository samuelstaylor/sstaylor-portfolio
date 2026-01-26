"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="pointer-events-none flex h-full items-center px-16 relative">
      {/* Main Box: left-aligned, 50% width with transition */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", x: -40, y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="
          pointer-events-auto
          w-1/2
          rounded-3xl
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-2xl
          p-12
          relative
          z-10
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
          <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_#34D399]">
            Computational Nanoscience
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-cyan-400 text-sm font-medium bg-white/10 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_#22D3EE]">
            Non-Adiabatic Dynamics
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-violet-400 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_#A78BFA]">
            Light-Matter Interactions
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-indigo-400 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_#818CF8]">
            Quantum Materials
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-pink-400 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_#F472B6]">
            TDDFT Simulations
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 text-orange-400 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_15px_#FB923C]">
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
