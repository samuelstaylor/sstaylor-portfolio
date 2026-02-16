"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Contact() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Image modal state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const openWidth = "30vw";
  const minimizedWidth = 220;
  const openHeight = "auto";
  const minimizedHeight = 56;

  const closeModal = () => {
    setIsImageModalOpen(false);
  };

  // Allow Escape key to close modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <motion.div
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragListener={isDragging}
        dragMomentum={false}
        onDragEnd={() => setIsDragging(false)}
        initial={{ opacity: 0, x: -40, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="pointer-events-auto fixed top-24 right-16 z-50"
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
              Contact
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
                transition={{ duration: 0.5 }}
                className="p-6 text-white/70 text-base leading-relaxed space-y-6 max-h-[70vh] overflow-y-auto scrollbar-theme relative z-10"
              >
                <p>
                  Feel free to reach out to me via email at{" "}
                  <a
                    href="mailto:sstaylor@uchicago.edu"
                    className="inline-flex items-center space-x-3 text-lg text-emerald-300 underline underline-offset-4 decoration-emerald-300/70 font-medium tracking-wide transition-all duration-300 hover:text-emerald-200 hover:decoration-emerald-200 hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                  >
                    <Image
                      src="/images/logos/email.png"
                      alt="Email"
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                    <span>sstaylor@uchicago.edu</span>
                  </a>
                </p>

                <p>
                  I enjoy collaborating on scientific and engineering projects,
                  creating 3D visualizations, and experimenting with creative
                  coding. Whether you have an idea you'd like to explore, want
                  to chat, or are looking for tutoring or mentorship, feel free
                  to reach out.
                </p>

                <Image
                  src="/images/glasgow.jpeg"
                  alt="Samuel Taylor"
                  width={120}
                  height={160}
                  onClick={() => setIsImageModalOpen(true)}
                  className="rounded-md border border-white/20 shadow-md mt-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative flex items-center justify-center max-w-[95vw] max-h-[95vh]"
            >
              <Image
                src="/images/glasgow.jpeg"
                alt="Samuel Taylor"
                width={0}
                height={0}
                sizes="90vw"
                style={{ width: "90vw", height: "auto", maxHeight: "95vh" }}
                className="rounded-md object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
