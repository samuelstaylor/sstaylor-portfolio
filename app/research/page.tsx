"use client";

import { motion } from "framer-motion";

export default function Research() {
  return (
    <div className="pointer-events-none flex h-full px-16 relative">
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", x: -40, y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="
          pointer-events-auto
          w-6/10
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
        <h1 className="text-4xl font-bold text-white mb-6">Research</h1>

        {/* Research content */}
        <div className="text-white/70 text-lg leading-relaxed space-y-4">
          <p>
            Here’s my research content. I specialize in computational
            nanoscience, non-adiabatic dynamics, light-matter interactions, and
            high-fidelity 3D visualizations. My work combines first-principles
            simulations, TDDFT, and scientific computing to explore quantum
            materials, molecular fragmentation, and excited-state dynamics.
          </p>

          <p>
            I have experience performing large-scale TDDFT simulations,
            analyzing Coulomb explosions, and visualizing quantum phenomena. I
            also create interactive 3D scientific visualizations that help
            convey complex physics concepts clearly and effectively.
          </p>

          <p>
            Outside of direct research, I collaborate on computational projects,
            develop scientific tools, and explore new methods for simulating
            light-matter interactions in quantum materials.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
