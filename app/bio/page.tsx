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

  // Gallery images with captions
  const galleryImages = [
    { src: "/images/sam-full-selfie.jpeg", caption: "At the University lab" },
    { src: "/images/sam-scout.jpg", caption: "With Scout on the farm" },
    {
      src: "/images/sam-conference.jpeg",
      caption: "Presenting at a conference",
    },
    { src: "/images/sam-3dwork.jpeg", caption: "Working on 3D visualizations" },
    // Add more images here
  ];

  const handleImageClick = (src: string) => {
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
    setGalleryIndex((galleryIndex + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setGalleryIndex(
      (galleryIndex - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isGalleryOpen) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeModal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [galleryIndex, isGalleryOpen]);

  const linkClass =
    "text-emerald-300 hover:text-emerald-400 underline decoration-emerald-500/50 hover:decoration-emerald-400 transition-colors duration-300";

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
                  className="float-left w-[140px] h-[180px] mr-4 mb-4 rounded-md border border-white/20 shadow-md cursor-pointer"
                  onClick={() =>
                    handleImageClick("/images/sam-full-selfie.jpeg")
                  }
                />

                <p>
                  I am Samuel Taylor, a Ph.D. student at the{" "}
                  <a
                    href="https://quantum.uchicago.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    University of Chicago
                  </a>
                  , researching quantum science and engineering in the{" "}
                  <a
                    href="https://galligroup.uchicago.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Galli Group
                  </a>
                  . I focus on computational modeling of light-matter
                  interactions, non-adiabatic dynamics, and quantum materials. I
                  focus on computational modeling of light-matter interactions,
                  non-adiabatic dynamics, and quantum materials. I focus on
                  computational modeling of light-matter interactions,
                  non-adiabatic dynamics, and quantum materials. I focus on
                  computational modeling of light-matter interactions,
                  non-adiabatic dynamics, and quantum materials.
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
                  STEM research accessible and collaborative.
                </p>

                {/* Gallery Section */}
                <div className="mt-8">
                  <h3 className="text-white font-semibold text-2xl mb-4">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="cursor-pointer relative group rounded-md overflow-hidden border border-white/20 shadow-md"
                        onClick={() => openGallery(idx)}
                      >
                        <Image
                          src={img.src}
                          alt={img.caption}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-1 text-center">
                          {img.caption}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal for enlarged image / gallery */}
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
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold z-10 hover:text-emerald-400 transition-colors"
                onClick={prevImage}
              >
                ‹
              </button>
              <Image
                src={
                  isGalleryOpen
                    ? galleryImages[galleryIndex].src
                    : modalImageSrc
                }
                alt={
                  isGalleryOpen ? galleryImages[galleryIndex].caption : "Image"
                }
                width={800}
                height={1000}
                className="rounded-md object-contain max-h-[80vh]"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl font-bold z-10 hover:text-emerald-400 transition-colors"
                onClick={nextImage}
              >
                ›
              </button>
              {isGalleryOpen && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/40 px-4 py-1 rounded-md text-center">
                  {galleryImages[galleryIndex].caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
