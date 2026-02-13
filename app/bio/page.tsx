"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Bio() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openWidth = "55vw";
  const minimizedWidth = 140;
  const openHeight = "auto";
  const minimizedHeight = 56;

  const galleryImages = [
    { src: "/images/sam-full-selfie.jpeg", caption: "At the University lab" },
    { src: "/images/sam-scout.jpg", caption: "With Scout on the farm" },
    { src: "/images/sam-presentation.jpg", caption: "Presenting at ELI-ALPS" },
    {
      src: "/images/sam-ce-lab.jpg",
      caption: "Ultrafast dynamics lab at ELI-ALPS",
    },
    { src: "/images/sam-disney.jpg", caption: "Disney world with my brother!" },
  ];

  const handleImageClick = (src: string) => {
    setIsGalleryOpen(false); // <-- FORCE gallery mode off
    setModalImageSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
    setIsGalleryOpen(false);
  };

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const nextImage = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setGalleryIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // Auto-rotate gallery (only when not minimized AND not open in modal)
  useEffect(() => {
    if (minimized || isGalleryOpen) return;

    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [minimized, isGalleryOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }

      if (isGalleryOpen) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isGalleryOpen]);

  const linkClass =
    "text-emerald-300 hover:text-emerald-400 underline decoration-emerald-500/50 hover:decoration-emerald-400 transition-colors duration-300";

  // Helpers for overlapping carousel
  const getIndex = (offset: number) => {
    return (
      (galleryIndex + offset + galleryImages.length) % galleryImages.length
    );
  };

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
            >
              {minimized ? "+" : "-"}
            </button>
          </motion.div>

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
                <Image
                  src="/images/sam-full-selfie.jpeg"
                  alt="Samuel Taylor"
                  width={140}
                  height={180}
                  className="float-left w-[140px] h-[180px] mr-4 mb-4 rounded-md border border-white/20 shadow-md cursor-pointer"
                  onClick={() =>
                    handleImageClick("/images/sam-full-selfie.jpeg")
                  }
                />

                <p>
                  I am Samuel Taylor, a Ph.D. student at the University of
                  Chicago, researching quantum science and engineering in the
                  Galli Group. I am Samuel Taylor, a Ph.D. student at the
                  University of Chicago, researching quantum science and
                  engineering in the Galli Group. I am Samuel Taylor, a Ph.D.
                  student at the University of Chicago, researching quantum
                  science and engineering in the Galli Group. I am Samuel
                  Taylor, a Ph.D. student at the University of Chicago,
                  researching quantum science and engineering in the Galli
                  Group. I am Samuel Taylor, a Ph.D. student at the University
                  of Chicago, researching quantum science and engineering in the
                  Galli Group. I am Samuel Taylor, a Ph.D. student at the
                  University of Chicago, researching quantum science and
                  engineering in the Galli Group.
                </p>

                <Image
                  src="/images/sam-scout.jpg"
                  alt="Sam and Scout"
                  width={140}
                  height={180}
                  className="float-left w-[140px] h-[180px] mr-4 mb-4 rounded-md border border-white/20 shadow-md cursor-pointer"
                  onClick={() => handleImageClick("/images/sam-scout.jpg")}
                />

                <p>
                  I grew up on a small farm in Hampshire, Illinois, and I am
                  passionate about making STEM research accessible and
                  collaborative. I grew up on a small farm in Hampshire,
                  Illinois, and I am passionate about making STEM research
                  accessible and collaborative. I grew up on a small farm in
                  Hampshire, Illinois, and I am passionate about making STEM
                  research accessible and collaborative. I grew up on a small
                  farm in Hampshire, Illinois, and I am passionate about making
                  STEM research accessible and collaborative. I grew up on a
                  small farm in Hampshire, Illinois, and I am passionate about
                  making STEM research accessible and collaborative. I grew up
                  on a small farm in Hampshire, Illinois, and I am passionate
                  about making STEM research accessible and collaborative. I
                  grew up on a small farm in Hampshire, Illinois, and I am
                  passionate about making STEM research accessible and
                  collaborative.
                </p>

                {/* Overlapping Carousel Gallery */}
                <div className="mt-12">
                  <h3 className="text-white font-semibold text-2xl mt-4">
                    Gallery
                  </h3>

                  <div className="relative w-full h-[320px] flex items-center justify-center">
                    {/* Left Image */}
                    <motion.div
                      key={getIndex(-1)}
                      className="absolute cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{
                        x: -220,
                        scale: 0.8,
                        opacity: 0.5,
                        zIndex: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        mass: 0.8,
                      }}
                      onClick={prevImage}
                    >
                      <Image
                        src={galleryImages[getIndex(-1)].src}
                        alt=""
                        width={220}
                        height={280}
                        className="rounded-xl border border-white/20 shadow-lg"
                      />
                    </motion.div>

                    {/* Center Image */}
                    <motion.div
                      key={galleryIndex}
                      className="absolute cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        zIndex: 2,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        mass: 0.8,
                      }}
                      onClick={() => openGallery(galleryIndex)}
                    >
                      <Image
                        src={galleryImages[galleryIndex].src}
                        alt={galleryImages[galleryIndex].caption}
                        width={260}
                        height={320}
                        className="rounded-2xl border border-white/30 shadow-2xl"
                      />
                      <div className="text-center mt-3 text-white text-sm">
                        {galleryImages[galleryIndex].caption}
                      </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                      key={getIndex(1)}
                      className="absolute cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{
                        x: 220,
                        scale: 0.8,
                        opacity: 0.5,
                        zIndex: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        mass: 0.8,
                      }}
                      onClick={nextImage}
                    >
                      <Image
                        src={galleryImages[getIndex(1)].src}
                        alt=""
                        width={220}
                        height={280}
                        className="rounded-xl border border-white/20 shadow-lg"
                      />
                    </motion.div>

                    {/* Arrows */}
                    {isGalleryOpen && (
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-emerald-400 transition-colors"
                        onClick={prevImage}
                      >
                        ‹
                      </button>
                    )}
                    {isGalleryOpen && (
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-emerald-400 transition-colors"
                        onClick={nextImage}
                      >
                        ›
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {(isModalOpen || isGalleryOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {isGalleryOpen && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-emerald-400"
                  onClick={prevImage}
                >
                  ‹
                </button>
              )}

              <Image
                src={
                  isGalleryOpen
                    ? galleryImages[galleryIndex].src
                    : modalImageSrc
                }
                alt="Image"
                width={800}
                height={1000}
                className="rounded-md object-contain max-h-[80vh]"
              />

              {isGalleryOpen && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold hover:text-emerald-400"
                  onClick={nextImage}
                >
                  ›
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
