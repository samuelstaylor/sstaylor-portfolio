"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Music() {
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Gallery state
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState<
    { src: string; caption: string }[]
  >([]);

  const rotationIntervalRef = useRef<number | null>(null);

  const openWidth = "50vw";
  const minimizedWidth = 190;
  const openHeight = "auto";
  const minimizedHeight = 56;

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
      src: "/images/music/band-gardens.jpg",
      caption: "Photoshoot with the Samuel Taylor Quintet",
    },
    {
      src: "/images/music/bbb-ny.jpg",
      caption: "Jack Rudin Jazz competition 2023, NYC",
    },
    { src: "/images/music/sax-horse1.jpg", caption: "Interest piqued" },
    {
      src: "/images/music/multi-instruments.jpg",
      caption: "Many instruments, one musician",
    },
    { src: "/images/music/band-gig.jpg", caption: "Playing at the Jazz Bar" },
    { src: "/images/music/sax-horse2.jpg", caption: "Happy horses" },
    { src: "/images/music/xmas-bass.jpg", caption: "Christmas jazz bass" },
    {
      src: "/images/music/quintet-poster.jpg",
      caption: "Samuel Taylor Quintet poster design",
    },
    { src: "/images/music/sax-horse3.jpg", caption: "Taming the wild beast" },
  ];

  const bagpipeVideos = [
    { title: "Bagpipe parade", url: "https://youtube.com/embed/26Jn6Ec7UZU" },
  ];

  const bagpipeGallery = [
    {
      src: "/images/music/pipes-arthur-seat1.jpg",
      caption: "Bagpipes at Arthur's Seat, Edinburgh",
    },
    {
      src: "/images/music/pipes-premarch.jpg",
      caption: "About to march the Royal Mile",
    },
    {
      src: "/images/music/pipes-arthur-seat3.jpg",
      caption: "Climbing in kilt",
    },
    {
      src: "/images/music/pipes-grass-market.jpg",
      caption: "Grassmarket, Edinburgh",
    },
    {
      src: "/images/music/pipes-arthur-seat2.jpg",
      caption: "Performing on Arthur's Seat",
    },
    {
      src: "/images/music/pipes-royal-mile.jpg",
      caption: "With the band before marching",
    },
    {
      src: "/images/music/piping-competitions.jpg",
      caption: "Dunbar competition with the band",
    },
  ];

  const compositionVideos = [
    {
      title: "Original Composition",
      url: "https://www.youtube.com/embed/lygr98NpsNc",
    },
  ];

  // ---------- Gallery Controls ----------
  const openGalleryModal = (
    gallery: { src: string; caption: string }[],
    index: number
  ) => {
    setCurrentGallery(gallery);
    setGalleryIndex(index);
    setIsGalleryOpen(true);
  };

  const closeModal = () => setIsGalleryOpen(false);

  const nextImage = () => {
    setGalleryIndex((prev) => (prev + 1) % currentGallery.length);
    resetAutoRotate();
  };

  const prevImage = () => {
    setGalleryIndex(
      (prev) => (prev - 1 + currentGallery.length) % currentGallery.length
    );
    resetAutoRotate();
  };

  const resetAutoRotate = () => {
    if (rotationIntervalRef.current !== null)
      clearInterval(rotationIntervalRef.current);
    if (minimized || isGalleryOpen) return;
    rotationIntervalRef.current = window.setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % currentGallery.length);
    }, 4000);
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

  // ---------- Render ----------
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
                  onImageClick={openGalleryModal}
                />

                <Section
                  title="Bagpipes"
                  intro="I also play the bagpipes, performing solo and in competitions. I enjoy exploring traditional tunes as well as experimental arrangements."
                  videos={bagpipeVideos}
                  gallery={bagpipeGallery}
                  onImageClick={openGalleryModal}
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

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
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
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Arrow */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl font-bold z-10 hover:text-emerald-400 transition-colors"
                onClick={prevImage}
              >
                ‹
              </button>

              {/* Image */}
              <Image
                src={currentGallery[galleryIndex].src}
                alt={currentGallery[galleryIndex].caption}
                width={0}
                height={0}
                sizes="90vw"
                style={{ width: "90vw", height: "auto", maxHeight: "95vh" }}
                className="rounded-md object-contain cursor-pointer"
              />

              {/* Right Arrow */}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl font-bold z-10 hover:text-emerald-400 transition-colors"
                onClick={nextImage}
              >
                ›
              </button>

              {/* Caption */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/40 px-4 py-1 rounded-md text-center max-w-[90vw]">
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
// Section Component
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
  const [galleryIndex, setGalleryIndex] = useState(0);
  const rotationIntervalRef = useRef<number | null>(null);

  const resetAutoRotate = () => {
    if (rotationIntervalRef.current !== null)
      clearInterval(rotationIntervalRef.current);
    if (!gallery) return;
    rotationIntervalRef.current = window.setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
  };

  useEffect(() => {
    resetAutoRotate();
    return () => {
      if (rotationIntervalRef.current !== null)
        clearInterval(rotationIntervalRef.current);
    };
  }, [gallery]);

  const nextImage = () => {
    if (!gallery) return;
    setGalleryIndex((prev) => (prev + 1) % gallery.length);
    resetAutoRotate();
  };

  const prevImage = () => {
    if (!gallery) return;
    setGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    resetAutoRotate();
  };

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
        <div className="mt-8 w-full flex flex-col items-start">
          <h4 className="text-white/70 font-semibold text-lg mb-1">Gallery</h4>
          <div className="relative w-full min-h-[320px] flex items-center justify-center">
            <AnimatePresence initial={false}>
              {gallery.map((img, idx) => {
                const offset =
                  (idx - galleryIndex + gallery.length) % gallery.length;
                const isVisible =
                  offset === 0 || offset === 1 || offset === gallery.length - 1;
                const isCenter = offset === 0;
                if (!isVisible) return null;

                const xOffset = offset === 0 ? 0 : offset === 1 ? 220 : -220;
                const scale = isCenter ? 1 : 0.8;
                const opacity = isCenter ? 1 : 0.5;

                return (
                  <motion.div
                    key={img.src}
                    initial={{ x: xOffset, opacity: 0, scale: scale }}
                    animate={{ x: xOffset, opacity: opacity, scale: scale }}
                    exit={{ x: xOffset, opacity: 0, scale: scale }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      if (isCenter) onImageClick && onImageClick(gallery, idx);
                      else if (offset === 1) nextImage();
                      else if (offset === gallery.length - 1) prevImage();
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
      )}
    </div>
  );
}
