"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link"; // <- add this at the top of your file

export default function Home() {
  const keywords = [
    {
      text: "Computational Quantum Physicist",
      color: "text-emerald-400",
      glow: "#34D399",
      url: "https://www.nature.com/subjects/computational-nanotechnology",
    },
    {
      text: "Musician & Multi-instrumentalist",
      color: "text-cyan-400",
      glow: "#22D3EE",
      url: "/music/",
    },
    {
      text: "Scientific Software Engineer",
      color: "text-violet-400",
      glow: "#A78BFA",
      url: "https://en.wikipedia.org/wiki/Software_engineering",
    },
    {
      text: "3D visualizer",
      color: "text-indigo-400",
      glow: "#818CF8",
      url: "https://en.wikipedia.org/wiki/Scientific_visualization",
    },
    {
      text: "Composer & Arranger",
      color: "text-pink-400",
      glow: "#F472B6",
      url: "/music",
    },
    {
      text: "Ph.D. Researcher",
      color: "text-orange-400",
      glow: "#FB923C",
      url: "https://galligroup.uchicago.edu/People/staylor.php",
    },
  ];

  return (
    <div className="pointer-events-none flex h-full items-center px-16 relative">
      {/* Main Box */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", x: -40, y: 10 }}
        animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="
          pointer-events-auto
          w-6/10
          rounded-3xl
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-2xl
          p-12
          relative
          z-10
        "
      >
        {/* Name */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
          Samuel Taylor
        </h1>

        {/* NSF / PME Fellow */}
        <p className="mt-2 text-white/70 text-lg font-medium">
          NSF GRFP Fellow · PME Graduate Fellow
        </p>

        {/* Keywords / chips */}
        <div className="flex flex-wrap gap-3 mt-6">
          {keywords.map((keyword) => {
            const [hover, setHover] = useState(false);

            // Check if the URL is internal (starts with "/")
            const isInternal = keyword.url.startsWith("/");

            return isInternal ? (
              <Link key={keyword.text} href={keyword.url} passHref>
                <span
                  className={`px-3 py-1 rounded-full bg-white/10 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 ${keyword.color} cursor-pointer`}
                  style={{
                    boxShadow: hover ? `0 0 15px ${keyword.glow}` : "none",
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  {keyword.text}
                </span>
              </Link>
            ) : (
              <a
                key={keyword.text}
                href={keyword.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1 rounded-full bg-white/10 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 ${keyword.color}`}
                style={{
                  boxShadow: hover ? `0 0 15px ${keyword.glow}` : "none",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {keyword.text}
              </a>
            );
          })}
        </div>

        {/* Short bio */}
        <p className="mt-6 text-white/70 text-lg leading-relaxed">
          Welcome! I am a Ph.D. student in Quantum Science and Engineering at
          the University of Chicago, specializing in First-principles materials
          simulations, excited-state dynamics, and high-fidelity 3D
          visualizations. My research combines first-principles simulations,
          TDDFT, and scientific computing to explore quantum materials,
          light–matter interactions, and molecular fragmentation.
        </p>
      </motion.div>
    </div>
  );
}
