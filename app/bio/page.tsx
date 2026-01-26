"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Bio() {
  return (
    <div className="pointer-events-none flex h-full px-16 relative">
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", x: -40, y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="
          pointer-events-auto
          w-6/10
          max-h-[calc(100vh-8rem)]  /* leave extra space at top & bottom */
          mt-24
          mb-8                   /* extra bottom spacing */
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
        <h1 className="text-4xl font-bold text-white mb-6">Bio</h1>

        {/* Bio content with floated image */}
        <div className="text-white/70 text-lg leading-relaxed space-y-4">
          <Image
            src="/images/sam-full-selfie.jpeg"
            alt="Samuel Taylor"
            width={140}
            height={180}
            className="float-left mr-6 mb-4 rounded-md border border-white/20 shadow-md"
          />

          <p>
            I am a Ph.D. student in Quantum Science and Engineering at the
            University of Chicago, specializing in computational nanoscience,
            excited-state dynamics, and high-fidelity 3D visualizations. My
            research combines first-principles simulations, TDDFT, and
            scientific computing to explore quantum materials, light–matter
            interactions, and molecular fragmentation.
          </p>

          <p>
            Outside of research, I am passionate about 3D design, scientific
            visualization, and building tools that make complex physics
            accessible and interactive. I enjoy collaborating with other
            researchers and sharing insights through engaging visual and
            computational work.
          </p>

          <p>
            When I’m not in the lab, I enjoy exploring creative 3D projects,
            designing interactive scientific visualizations, and experimenting
            with new computational techniques to push the boundaries of quantum
            simulations.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
