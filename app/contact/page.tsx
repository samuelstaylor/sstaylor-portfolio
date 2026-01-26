"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [minimized, setMinimized] = useState(false);
  const openWidth = "25vw";
  const minimizedWidth = 300; // keeps title on one line
  const openHeight = "auto";
  const minimizedHeight = 56;

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragMomentum={false}
      initial={{ opacity: 0, filter: "blur(12px)", x: -40, y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="pointer-events-auto fixed top-24 right-16 z-50 cursor-grab"
    >
      <motion.div
        initial={{ width: openWidth, height: openHeight }}
        animate={{
          width: minimized ? minimizedWidth : openWidth,
          height: minimized ? minimizedHeight : openHeight,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden relative"
      >
        <div className="flex justify-between items-center px-4 py-2 h-14">
          <h2 className="text-white font-bold text-4xl select-none">Contact</h2>
          <button
            onClick={() => setMinimized(!minimized)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold transition-colors duration-300"
            aria-label={minimized ? "Maximize" : "Minimize"}
          >
            {minimized ? "+" : "-"}
          </button>
        </div>

        <AnimatePresence>
          {!minimized && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-4 text-white/70 text-lg leading-relaxed space-y-4 max-h-[70vh] overflow-y-auto scrollbar-theme"
            >
              <p>
                Feel free to reach out to me via email at{" "}
                <a
                  href="mailto:samuel@example.com"
                  className="underline hover:text-emerald-400"
                >
                  samuel@example.com
                </a>{" "}
                or connect with me on professional platforms.
              </p>

              <p>
                I enjoy collaborating on computational physics projects, 3D
                scientific visualizations, and exploring new approaches in
                quantum simulations.
              </p>

              <Image
                src="/images/sam-full-selfie.jpeg"
                alt="Samuel Taylor"
                width={120}
                height={160}
                className="rounded-md border border-white/20 shadow-md mt-2"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
