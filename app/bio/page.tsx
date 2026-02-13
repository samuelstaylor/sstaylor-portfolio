"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Bio() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const rotationIntervalRef = useRef<NodeJS.Timer | null>(null);

  const openWidth = "55vw"; // 55vw default
  const minimizedWidth = 140;
  const openHeight = "auto";
  const minimizedHeight = 56;

  const galleryImages = [
    { src: "/images/sam-presentation.jpg", caption: "Presenting at ELI-ALPS" },
    {
      src: "/images/sam-ce-lab.jpg",
      caption: "Ultrafast dynamics lab at ELI-ALPS",
    },
    { src: "/images/sam-farm.jpg", caption: "On the farm" },
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

  // Auto-rotate helpers
  const resetAutoRotate = () => {
    if (rotationIntervalRef.current) clearInterval(rotationIntervalRef.current);

    if (minimized || isGalleryOpen) return;

    rotationIntervalRef.current = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
  };

  const nextImage = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    resetAutoRotate();
  };

  const prevImage = () => {
    setGalleryIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
    resetAutoRotate();
  };

  // Initial auto-rotate
  useEffect(() => {
    resetAutoRotate();
    return () => {
      if (rotationIntervalRef.current)
        clearInterval(rotationIntervalRef.current);
    };
  }, [minimized, isGalleryOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
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
                <div className="mt-12 w-full flex flex-col items-start">
                  <h3 className="text-white font-semibold text-2xl mb-1">
                    Gallery
                  </h3>
                  <p className="text-white/70 text-sm mb-4 max-w-[90%]">
                    Here are some photos I have chosen that capture my life,
                    interests, and personality!
                  </p>

                  <div className="relative w-full min-h-[360px] flex items-center justify-center">
                    <AnimatePresence initial={false}>
                      {galleryImages.map((img, idx) => {
                        const offset =
                          (idx - galleryIndex + galleryImages.length) %
                          galleryImages.length;
                        const isVisible =
                          offset === 0 ||
                          offset === 1 ||
                          offset === galleryImages.length - 1;
                        const isCenter = offset === 0;

                        if (!isVisible) return null;

                        const xOffset =
                          offset === 0 ? 0 : offset === 1 ? 220 : -220;
                        const scale = isCenter ? 1 : 0.8;
                        const opacity = isCenter ? 1 : 0.5;

                        return (
                          <motion.div
                            key={img.src}
                            initial={{ x: xOffset, opacity: 0, scale: scale }}
                            animate={{
                              x: xOffset,
                              opacity: opacity,
                              scale: scale,
                            }}
                            exit={{ x: xOffset, opacity: 0, scale: scale }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute flex flex-col items-center cursor-pointer"
                            onClick={() => {
                              if (isCenter) {
                                openGallery(idx);
                              } else {
                                // Calculate relative offset
                                const relOffset =
                                  (idx - galleryIndex + galleryImages.length) %
                                  galleryImages.length;
                                if (relOffset === 1) nextImage();
                                if (relOffset === galleryImages.length - 1)
                                  prevImage();
                              }
                            }}
                          >
                            <Image
                              src={img.src}
                              alt={img.caption}
                              width={isCenter ? 260 : 220}
                              height={isCenter ? 320 : 280}
                              className="rounded-2xl border border-white/30 shadow-2xl object-contain max-h-[320px]"
                            />
                            {isCenter && (
                              <div className="mt-2 text-white text-sm text-center max-w-[260px]">
                                {img.caption}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
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
              className="relative flex flex-col items-center justify-center max-w-[90vw] max-h-[90vh] overflow-auto p-4 scrollbar-theme"
              onClick={(e) => e.stopPropagation()}
            >
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
                <div className="mt-4 text-white text-base text-center max-w-[80vw] px-4">
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
