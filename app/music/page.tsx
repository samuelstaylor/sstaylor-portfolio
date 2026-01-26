"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Music() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState<
    { src: string; caption: string }[]
  >([]);

  const openWidth = "50vw";
  const minimizedWidth = 190;
  const openHeight = "auto";
  const minimizedHeight = 56;

  // Sample YouTube links and gallery images for each section
  const jazzVideos = [
    {
      title: "Improvised Bari Sax solo -- Blair Big Band",
      url: "https://www.youtube.com/embed/n4brKEk-twE",
    },
    {
      title: "Samuel Taylor quintet",
      url: "https://www.youtube.com/embed/O_q65L8Dm2s",
    },
    {
      title: "Blair Big Band Things to Come",
      url: "https://www.youtube.com/embed/-Clrckxfeo4",
    },
  ];

  const jazzGallery = [
    {
      src: "/images/sam-full-selfie.jpeg",
      caption: "Jazz Ensemble Performance",
    },
    { src: "/images/sam-scout.jpg", caption: "Solo Jazz Performance" },
  ];

  const bagpipeVideos = [
    { title: "Bagpipe parade", url: "https://youtube.com/embed/26Jn6Ec7UZU" },
  ];

  const bagpipeGallery = [
    { src: "/images/sam-full-selfie.jpeg", caption: "Outdoor Performance" },
    { src: "/images/sam-scout.jpg", caption: "Competition Performance" },
  ];

  const compositionVideos = [
    {
      title: "Original Composition",
      url: "https://www.youtube.com/embed/lygr98NpsNc",
    },
  ];

  const handleImageClick = (
    gallery: { src: string; caption: string }[],
    index: number
  ) => {
    setCurrentGallery(gallery);
    setGalleryIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageSrc("");
  };

  const nextImage = () => {
    setGalleryIndex((galleryIndex + 1) % currentGallery.length);
  };

  const prevImage = () => {
    setGalleryIndex(
      (galleryIndex - 1 + currentGallery.length) % currentGallery.length
    );
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "Escape") closeModal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [galleryIndex, isModalOpen]);

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
              Music
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
                className="p-6 text-white/70 text-base leading-relaxed space-y-8 max-h-[70vh] overflow-y-auto scrollbar-theme relative z-10"
              >
                <Section
                  title="Jazz"
                  intro="I have been performing jazz for several years, playing piano and collaborating in ensembles. My experience spans improvisation, composition, and live performances."
                  videos={jazzVideos}
                  gallery={jazzGallery}
                  onImageClick={handleImageClick}
                />

                <Section
                  title="Bagpipes"
                  intro="I also play the bagpipes, performing solo and in competitions. I enjoy exploring traditional tunes as well as experimental arrangements."
                  videos={bagpipeVideos}
                  gallery={bagpipeGallery}
                  onImageClick={handleImageClick}
                />

                <Section
                  title="Compositions"
                  intro="I compose original pieces that blend classical, jazz, and experimental styles. My work often integrates digital instrumentation and audio programming."
                  videos={compositionVideos}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal for enlarged image / gallery */}
      <AnimatePresence>
        {isModalOpen && (
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
                src={currentGallery[galleryIndex].src}
                alt={currentGallery[galleryIndex].caption}
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
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/40 px-4 py-1 rounded-md text-center">
                {currentGallery[galleryIndex].caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
// -----------------------
// Section Component (Intro + Videos + Gallery)
// -----------------------
function Section({
  title,
  intro,
  videos,
  gallery,
  onImageClick,
}: {
  title: string;
  intro: string;
  videos?: { title: string; url: string }[];
  gallery?: { src: string; caption: string }[];
  onImageClick?: (
    gallery: { src: string; caption: string }[],
    index: number
  ) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-2xl">{title}</h3>
      <p>{intro}</p>

      {videos && videos.length > 0 && (
        <div className="space-y-2 mt-4">
          <h4 className="text-white/70 font-semibold text-lg">Videos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.map((video, idx) => (
              <div key={idx} className="aspect-video">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md border border-white/20 shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {gallery && gallery.length > 0 && (
        <div className="space-y-2 mt-4">
          <h4 className="text-white/70 font-semibold text-lg">Gallery</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((img, idx) => (
              <div
                key={idx}
                className="cursor-pointer relative group rounded-md overflow-hidden border border-white/20 shadow-md"
                onClick={() => onImageClick && onImageClick(gallery, idx)}
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
      )}
    </div>
  );
}
