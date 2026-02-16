"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Bio() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Gallery modal state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Non-gallery modal state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const rotationIntervalRef = useRef<number | null>(null);

  const openWidth = "55vw"; // 55vw default
  const minimizedWidth = 140;
  const openHeight = "auto";
  const minimizedHeight = 56;

  const galleryImages = [
    {
      src: "/images/castles-in-scotland.jpg",
      caption: "Castle in the Highlands",
    },
    { src: "/images/sam-disney.jpg", caption: "Disney world with my brother!" },
    { src: "/images/avatar.jpg", caption: "Zhangjiajie" },
    { src: "/images/sam-presentation.jpg", caption: "Presenting at ELI-ALPS" },
    { src: "/images/golden-temple.jpg", caption: "Golden temple in Kyoto" },
    { src: "/images/sam-bela.jpg", caption: "Sam and Bela" },
    { src: "/images/grand-epoch-city.jpg", caption: "Grand Epoch City" },
    { src: "/images/sam-riding.jpg", caption: "Riding into the sunset" },
    {
      src: "/images/sam-ce-lab.jpg",
      caption: "Ultrafast dynamics lab at ELI-ALPS",
    },

    { src: "/images/great-wall.jpg", caption: "Great wall" },
    { src: "/images/sam-farm.jpg", caption: "With the fam" },

    { src: "/images/i-love-flowers.jpg", caption: "I love flowers!" },
    { src: "/images/baby-sam.jpg", caption: "Baby Sam!" },
    { src: "/images/let-there-be-light.jpg", caption: "Sunrise on Mount Fuji" },
  ];

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const openImageModal = (src: string) => {
    setModalImageSrc(src);
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsGalleryOpen(false);
    setIsImageModalOpen(false);
  };

  const resetAutoRotate = () => {
    if (rotationIntervalRef.current !== null)
      clearInterval(rotationIntervalRef.current);
    if (minimized || isGalleryOpen) return;
    rotationIntervalRef.current = window.setInterval(() => {
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

  useEffect(() => {
    resetAutoRotate();
    return () => {
      if (rotationIntervalRef.current !== null)
        clearInterval(rotationIntervalRef.current);
    };
  }, [minimized, isGalleryOpen]);

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
                {/* Non-gallery images */}
                <Image
                  src="/images/sam-full-selfie.jpeg"
                  alt="Samuel Taylor"
                  width={140}
                  height={180}
                  className="float-left w-[140px] h-[180px] mr-4 mb-4 rounded-md border border-white/20 shadow-md cursor-pointer"
                  onClick={() => openImageModal("/images/sam-full-selfie.jpeg")}
                />

                <p className="text-white/80 text-base leading-relaxed">
                  Hi, I’m Samuel Taylor! I’m an{" "}
                  <a
                    href=",https://www.nsfgrfp.org/"
                    className="font-bold underline text-emerald-400 transition-all duration-300 hover:animate-pulse hover:shadow-[0_0_10px_#818CF8]"
                  >
                    NSF GRFP Fellow
                  </a>{" "}
                  and Ph.D. student at the{" "}
                  <a
                    href="https://www.uchicago.edu"
                    className="font-bold underline text-red-400 transition-all duration-300 hover:animate-pulse hover:shadow-[0_0_10px_#818CF8]"
                  >
                    University of Chicago
                  </a>
                  , where I study{" "}
                  <a
                    href="https://pme.uchicago.edu/phd-programs/quantum-science-and-engineering"
                    className="font-bold underline text-cyan-400 transition-all duration-300 hover:animate-pulse hover:shadow-[0_0_10px_#34D399]"
                  >
                    Quantum Science and Engineering
                  </a>
                  . I’m part of the{" "}
                  <a
                    href="https://galligroup.uchicago.edu/"
                    className="font-bold underline text-indigo-400 transition-all duration-300 hover:animate-pulse hover:shadow-[0_0_10px_#818CF8]"
                  >
                    Galli Group
                  </a>
                  , where I develop computational methods to predict and
                  engineer material and molecular properties. I earned my
                  bachelor’s at{" "}
                  <a
                    href="https://www.vanderbilt.edu/"
                    className="font-bold underline text-yellow-400 transition-all duration-300 hover:animate-pulse hover:shadow-[0_0_10px_#818CF8]"
                  >
                    Vanderbilt University
                  </a>
                  , triple majoring in Computer Science, Physics, and
                  Mathematics. Outside academia, I enjoy{" "}
                  <Link
                    href="/music/"
                    className="font-bold underline text-orange-400 transition-all duration-300 hover:animate-pulse hover:shadow-[0_0_10px_#818CF8]"
                  >
                    music performance and composition
                  </Link>
                  , traveling, 3D design and engineering (hence this website
                  😄), and learning new skills.
                </p>

                <Image
                  src="/images/sam-scout.jpg"
                  alt="Sam and Scout"
                  width={140}
                  height={180}
                  className="float-left w-[140px] h-[180px] mr-4 mb-4 rounded-md border border-white/20 shadow-md cursor-pointer"
                  onClick={() => openImageModal("/images/sam-scout.jpg")}
                />

                <p>
                  I grew up on a small farm in{" "}
                  <a
                    href="https://www.hampshireil.org/"
                    className="font-bold underline text-violet-400 transition-all duration-300 hover:animate-pulse hover:shadow-[0_0_10px_#FB923C]"
                  >
                    Hampshire, Illinois
                  </a>
                  .
                </p>

                {/* Overlapping Carousel Gallery */}
                <div className="mt-12 w-full flex flex-col items-start">
                  <h3 className="text-white font-semibold text-2xl mb-1">
                    Gallery
                  </h3>
                  <p className="text-white/70 text-sm mb-4 max-w-[90%]">
                    Here are some photos I have chosen that capture stories of
                    life, interests, travels, and personality!
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
                              if (isCenter) openGallery(idx);
                              else {
                                if (offset === 1) nextImage();
                                if (offset === galleryImages.length - 1)
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

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
            onClick={closeModal} // click anywhere closes
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative flex items-center justify-center max-w-[95vw] max-h-[95vh]"
            >
              {/* Left Arrow */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl font-bold z-10 hover:text-emerald-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                ‹
              </button>

              {/* Image */}
              <Image
                src={galleryImages[galleryIndex].src}
                alt={galleryImages[galleryIndex].caption}
                width={0}
                height={0}
                sizes="90vw"
                style={{ width: "90vw", height: "auto", maxHeight: "95vh" }}
                className="rounded-md object-contain cursor-pointer"
              />

              {/* Right Arrow */}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl font-bold z-10 hover:text-emerald-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                ›
              </button>

              {/* Caption */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/40 px-4 py-1 rounded-md text-center max-w-[90vw]">
                {galleryImages[galleryIndex].caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Non-gallery image modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
            onClick={closeModal} // click anywhere closes
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative flex items-center justify-center max-w-[95vw] max-h-[95vh]"
            >
              <Image
                src={modalImageSrc}
                alt="Image"
                width={0}
                height={0}
                sizes="90vw"
                style={{ width: "90vw", height: "auto", maxHeight: "95vh" }}
                className="rounded-md object-contain cursor-pointer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
