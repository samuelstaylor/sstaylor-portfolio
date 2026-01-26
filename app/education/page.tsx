"use client";

import { motion } from "framer-motion";

export default function Education() {
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
        <h1 className="text-4xl font-bold text-white mb-6">
          Education & Experience
        </h1>

        {/* Education & Experience content */}
        <div className="text-white/70 text-lg leading-relaxed space-y-4">
          <p>
            I earned my undergraduate degree in Computer Science at Vanderbilt
            University, where I focused on computational physics and scientific
            computing. During this time, I conducted research in TDDFT
            simulations, Coulomb explosion modeling, and interactive 3D
            scientific visualizations.
          </p>

          <p>
            In addition to my academic work, I have gained experience as a
            research assistant, collaborating on projects involving light-matter
            interactions, quantum materials, and high-fidelity simulations. I
            also developed computational tools for analyzing simulation data and
            visualizing complex physical phenomena.
          </p>

          <p>
            My education and experience have equipped me with strong skills in
            numerical simulations, Python, C++, React, Three.js, and scientific
            visualization, which I continue to apply in ongoing research and
            personal projects.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
