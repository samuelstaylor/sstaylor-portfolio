"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Education() {
  const [minimized, setMinimized] = useState(false);
  const openWidth = "50vw";
  const minimizedWidth = 400;
  const openHeight = "auto";
  const minimizedHeight = 56;

  const skills = [
    {
      text: "Python",
      color: "text-emerald-400",
      glow: "#34D399",
      url: "https://www.python.org/",
    },
    {
      text: "C++",
      color: "text-cyan-400",
      glow: "#22D3EE",
      url: "https://isocpp.org/",
    },
    {
      text: "Fortran",
      color: "text-violet-400",
      glow: "#A78BFA",
      url: "https://fortran-lang.org/",
    },
    {
      text: "TDDFT / DFT",
      color: "text-pink-400",
      glow: "#F472B6",
      url: "https://en.wikipedia.org/wiki/Time-dependent_density_functional_theory",
    },
    {
      text: "CUDA & OpenMP",
      color: "text-orange-400",
      glow: "#FB923C",
      url: "https://developer.nvidia.com/cuda-zone",
    },
    {
      text: "Quantum Espresso",
      color: "text-indigo-400",
      glow: "#818CF8",
      url: "https://www.quantum-espresso.org/",
    },
    {
      text: "WEST",
      color: "text-emerald-400",
      glow: "#34D399",
      url: "https://west-code.org/",
    },
    {
      text: "SALMON",
      color: "text-cyan-400",
      glow: "#22D3EE",
      url: "https://salmon-tddft.jp/",
    },
    {
      text: "Scientific Visualization",
      color: "text-violet-400",
      glow: "#A78BFA",
      url: "https://en.wikipedia.org/wiki/Scientific_visualization",
    },
    {
      text: "Blender",
      color: "text-orange-400",
      glow: "#FB923C",
      url: "https://www.blender.org/",
    },
    {
      text: "React / Three.js",
      color: "text-pink-400",
      glow: "#F472B6",
      url: "https://reactjs.org/",
    },
    {
      text: "Machine Learning",
      color: "text-indigo-400",
      glow: "#818CF8",
      url: "https://en.wikipedia.org/wiki/Machine_learning",
    },
  ];

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragMomentum={false}
      initial={{ opacity: 0, x: -40, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="pointer-events-auto fixed top-24 left-16 z-50 cursor-grab"
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
        <div className="flex justify-between items-center px-6 py-3 h-14 relative z-10">
          <h2 className="text-white font-bold text-3xl select-none whitespace-nowrap">
            Education & Experience
          </h2>
          <button
            onClick={() => setMinimized(!minimized)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold transition-colors duration-300 relative z-10"
            aria-label={minimized ? "Maximize" : "Minimize"}
          >
            {minimized ? "+" : "-"}
          </button>
        </div>

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
              <p>
                <a
                  href="/pdf/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block
                    text-lg
                    text-emerald-300
                    underline underline-offset-4
                    decoration-emerald-300/70
                    font-medium tracking-wide
                    transition-all duration-300
                    hover:text-emerald-200
                    hover:decoration-emerald-200
                    hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.6)]
                  "
                >
                  View CV
                </a>
              </p>

              <EducationBlock
                img="/images/uchicago.png"
                school="University of Chicago | Chicago, IL"
                degree="Ph.D., Quantum Science and Engineering"
                advisor="Giulia Galli"
                dates="September 2025 – Present"
              />

              <EducationBlock
                img="/images/vandy.png"
                school="Vanderbilt University | Nashville, TN"
                degree="B.S. Physics (Highest Honors), Computer Science, Applied Mathematics"
                advisor="Kálmán Varga"
                dates="August 2021 – May 2025"
              />

              <h3 className="text-white font-semibold text-2xl mt-4">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <SkillPill key={skill.text} {...skill} />
                ))}
              </div>

              <h3 className="text-white font-semibold text-2xl mt-4">
                Research Experiences
              </h3>

              <Experience
                img="/images/pme-hex.png"
                title="Pritzker School of Molecular Engineering at University of Chicago | Chicago, IL"
                role="Ph.D. Student Researcher, PI: Dr. Giulia Galli"
                dates="September 2025 – Present"
                summary="Developing first-principles non-adiabatic molecular dynamics methods using linear-response TDDFT and surface-hopping techniques within the WEST code."
              />

              <Experience
                img="/images/vandy-physics.jpg"
                title="Vanderbilt University | Nashville, TN"
                role="Research Assistant: Computational Nanoscience, PI: Dr. Kálmán Varga"
                dates="August 2023 – August 2025"
                summary="Conducted large-scale TDDFT simulations of light–matter interactions and molecular collisions, generating multi-terabyte datasets while mentoring students in simulation workflows and analysis."
              />

              <Experience
                img="/images/eli-logo.jpg"
                title="ELI-ALPS Laser Research Institute | Szeged, Hungary"
                role="Research Assistant: Ultrafast Dynamics / Theory & Simulation"
                dates="May 2024 / 2025 – August 2024 / 2025"
                summary="Performed hundreds of real-time TDDFT simulations of laser-driven Coulomb explosion and high-harmonic generation, presenting results to international theory and experimental groups."
              />

              <Experience
                img="/images/vandy-cs.png"
                title="Vanderbilt University | Nashville, TN"
                role="Research Assistant: Computer Graphics, Numerical Methods, and Machine Learning, PI: Dr. David Hyde"
                dates="January 2025 – May 2025"
                summary="Applied machine learning to accelerate iterative linear solvers and numerically solved fluid dynamics equations with high-quality visualization in Blender and Houdini."
              />

              <Experience
                img="/images/tsukuba.png"
                title="University of Tsukuba | Tsukuba, Japan"
                role="Research Assistant, PI: Dr. Kazuhiro Yabana"
                dates="May 2023 – July 2023"
                summary="Performed DFT and QED-DFT simulations using SALMON to study electronic structure and chiral energy shifts, visualizing and presenting results with scientific visualization tools."
              />

              <Experience
                img="/images/vandy-physics.jpg"
                title="Vanderbilt University | Nashville, TN"
                role="Research Assistant: Cosmology, PI: Dr. Robert Scherrer"
                dates="February 2022 – May 2023"
                summary="Developed numerical cosmology tools to analyze dark energy models through luminosity distance calculations, statistical fitting, and data visualization in Python."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// -----------------------
// Skill Pill component
// -----------------------
function SkillPill({
  text,
  color,
  glow,
  url,
}: {
  text: string;
  color: string;
  glow: string;
  url: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <span
        className={`px-3 py-1 rounded-full bg-white/10 text-sm font-medium transition-all duration-300 ease-out hover:scale-105 ${color}`}
        style={{ boxShadow: hover ? `0 0 15px ${glow}` : "none" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {text}
      </span>
    </a>
  );
}

// -----------------------
// Education Block
// -----------------------
function EducationBlock({
  img,
  school,
  degree,
  advisor,
  dates,
}: {
  img: string;
  school: string;
  degree: string;
  advisor: string;
  dates: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <Image
        src={img}
        alt={school}
        width={140}
        height={140}
        className="object-contain"
      />
      <div>
        <h3 className="text-white font-semibold text-xl">{school}</h3>
        <p>{degree}</p>
        <p>Advisor: {advisor}</p>
        <p>{dates}</p>
      </div>
    </div>
  );
}

// -----------------------
// Experience component
// -----------------------
function Experience({
  img,
  title,
  role,
  dates,
  summary,
}: {
  img: string;
  title: string;
  role: string;
  dates: string;
  summary: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <Image
        src={img}
        alt={title}
        width={120}
        height={120}
        className="object-contain"
      />
      <div className="space-y-1">
        <p>
          <strong>{title}</strong>
        </p>
        <p className="text-white/80">{role}</p>
        <p className="text-white/60 italic leading-relaxed">{summary}</p>
        <p className="text-white/50">{dates}</p>
      </div>
    </div>
  );
}
