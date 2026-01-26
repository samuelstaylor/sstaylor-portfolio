"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Bio() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const openWidth = "50vw"; // open width
  const minimizedWidth = 140; // minimized width in px
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
            Bio
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
              <Image
                src="/images/sam-full-selfie.jpeg"
                alt="Samuel Taylor"
                width={140}
                height={180}
                className="float-left mr-6 mb-4 rounded-md border border-white/20 shadow-md"
              />

              <p>
                I am a Ph.D. student in Quantum Science and Engineering at the
                University of Chicago, specializing in computational
                nanoscience, excited-state dynamics, and high-fidelity 3D
                visualizations. My research combines first-principles
                simulations, TDDFT, and scientific computing to explore quantum
                materials, light–matter interactions, and molecular
                fragmentation.
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
                designing interactive scientific visualizations, and
                experimenting with new computational techniques to push the
                boundaries of quantum simulations.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
