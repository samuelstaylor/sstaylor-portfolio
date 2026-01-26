"use client";

import { motion } from "framer-motion";

export default function Projects() {
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
        <h1 className="text-4xl font-bold text-white mb-6">Projects</h1>

        {/* Projects content */}
        <div className="text-white/70 text-lg leading-relaxed space-y-4">
          <p>
            My projects explore computational nanoscience, quantum simulations,
            and interactive 3D scientific visualization. I develop tools to
            simulate light-matter interactions, molecular fragmentation, and
            quantum materials, combining Python, C++, and Three.js.
          </p>

          <p>
            Examples include TDDFT simulations of Coulomb explosions, hydrogen
            scattering on graphene, and immersive 3D visualization platforms for
            scientific data. Each project emphasizes high-fidelity simulations
            and visually intuitive results.
          </p>

          <p>
            I also integrate modern web technologies to create interactive
            portfolio components, allowing others to explore simulation outcomes
            and visual data seamlessly online.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
